import {Component, OnInit, AfterViewInit, ElementRef, Input, ViewChild, HostListener} from '@angular/core';
import * as THREE from 'three';
import OrbitControls from 'three-orbitcontrols';//module for rotation camera
import {EmitterService} from "../../services/EmitterService";//Initialization of emitter to pass data into parent component (see NewentryPage)
import {Subscription} from 'rxjs/Subscription';
import {returnPointService} from "../../services/returnPointService";
import {LocalStorageService} from "../../services/LocalStorageService";
import {PassClickService} from "../../services/PassClickService";
import {HttpService} from "../../services/HttpService";
/*
 Generated class for the Newentry page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'three-d-scene',
  templateUrl:  'canvas.html'
})
export class CanvasComponent implements OnInit, AfterViewInit {

  /* PROPERTIES FOR SCENE AND MANIPULATING OF OBJECT (PRIVATE PROPERTIES) */
  /*Main properties*/
  @ViewChild('canvas')
  public canvasRef: ElementRef;
  private mesh: THREE.Mesh;
  private renderer: THREE.WebGLRenderer;
  private get canvas() : HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private light: THREE.AmbientLight;
  private drectionalLight1: THREE.DirectionalLight;
  private drectionalLight2: THREE.DirectionalLight;
  private aspectRatio:number;
  private animation:any;

  /*user interaction properties*/
  private arr=['Ear Right', 'Ear Left', 'Forehead', 'Top of skull', 'Lips', 'Nose', 'Right Eye', 'Left Eye', 'Chin', 'Right Cheek', 'Left Cheek', 'Neck', 'Left Shoulder', 'Right Shoulder', 'Back', 'Chest', 'Back of the head', 'Temple'];
  private line:any={};
  private intersects: any;
  private raycaster: THREE.Raycaster;
  private mouse: THREE.Vector2;
  private loader: THREE.JSONLoader;
  private cameraTarget: THREE.Vector3;
  @Input()
  public controls: any;
  private isUserInteracting: boolean = false;
 /*pass in to emmiter*/
  private dataObj:any;
  private itemData: any;
  private subscription:Subscription;
  private itemPoint:any;
  private itemFace:THREE.Vector3;
  private mouseHelperMaterial:any={};
  private itemLevel:any;
  private itemName:any;

  /*last selected pin*/
  private mouseHelper:any={};
  /*private geometry:THREE.Geometry;*/


/*Get name of body part by click*/
  @HostListener('click', ['$event'])
  onClick(event) {
    event.preventDefault();
    this.checkBodyPart(event);
  }

  constructor(public LocalStorageService:LocalStorageService, private httpService:HttpService, private _returnPointService:returnPointService, private emitter:EmitterService, private PassClickService:PassClickService) {
    /*Get data from popup-menu.ts with Object with information about choose level*/
    this.subscription = this._returnPointService.pointItem$.subscribe(
      item => {this.itemData = item;
        this.itemPoint=item.point;
        this.itemFace=item.face;
        this.itemLevel=item.level;
        this.itemName=item.name;
        this.markLastPoint(this.itemFace,this.itemPoint,this.itemLevel,this.itemName);
        });
    /*Get data from parent component with information about click*/
    this.subscription=this.PassClickService.subscribe((msg) => {
      /*console.log(msg);*/
      this.clearPointersFunction();
    });
  }
  ngOnInit(){
    /*Get data from server and push into LocalStorage*/
    this.httpService.getTempData().subscribe((data:any) => {
      if(!data.mainData[0]) return;
      let textObj=data.mainData[0].temp;
      for (let key in textObj) {
        window.localStorage[key]=textObj[key];
      }
    });
    /*Prepere Objects for PointerMarkers*/
    for(let i=0; i<this.arr.length; i++){
      Object.defineProperty(this.line, this.arr[i],{value:{}, configurable: true, writable: true, enumerable: true });
      Object.defineProperty(this.mouseHelper, this.arr[i],{value:{}, configurable: true, writable: true, enumerable: true });
      Object.defineProperty(this.mouseHelperMaterial, this.arr[i],{value:{}, configurable: true, writable: true, enumerable: true });
    }
  }
  clearPointersFunction(){
    for(let i=0; i<this.arr.length; i++){
      let prop=this.arr[i];
      this.mouseHelper[prop].visible = false;
      this.line[prop].visible = false;
      if(window.localStorage.getItem(prop) != null&&window.localStorage[prop].length>0){
        window.localStorage.removeItem(prop);
      }
    }

  }
    ionViewDidLoad() {
    this.renderer.render(this.scene, this.camera);
  }

  /**
   * Creating of  the 3DObject (use in AfterViewInit)
   */
  private create3DObject() {
    let textureLoader = new THREE.TextureLoader();
    this.loader = new THREE.JSONLoader();
    this.loader.load( 'assets/obj/leeperrysmith/LeePerrySmith.js', ( geometry )=> {

      let material = new THREE.MeshPhongMaterial( {
        specular: 0x111111,
        map: textureLoader.load( 'assets/obj/leeperrysmith/Map-COL.jpg' ),
        specularMap: textureLoader.load( 'assets/obj/leeperrysmith/Map-SPEC.jpg' ),
        normalMap: textureLoader.load( 'assets/obj/leeperrysmith/Infinite-Level_02_Tangent_SmoothUV.jpg' ),
        normalScale: new THREE.Vector2( 0.75, 0.75 ),
        shininess: 25
      } );
      this.mesh = new THREE.Mesh( geometry, material );
      this.scene.add( this.mesh );
      this.mesh.scale.set( 10, 10, 10 );
      this.raycaster = new THREE.Raycaster();
      this.mouse = new THREE.Vector2();


    } );
  }
  private pinSet(){

    let geometry = new THREE.Geometry();
    geometry.vertices.push( new THREE.Vector3(), new THREE.Vector3() );
    for(let i=0; i<this.arr.length; i++){
      let prop=this.arr[i];
      this.line[prop] = new THREE.Line( geometry, new THREE.LineBasicMaterial( { linewidth: 4 } ) );
      this.scene.add( this.line[prop]);
    }


    /*this.mouseHelper = new THREE.Mesh( new THREE.BoxGeometry( 1, 1, 10 ), new THREE.MeshNormalMaterial() );*/
    for(let i=0; i<this.arr.length; i++) {
      let prop=this.arr[i];
      this.mouseHelperMaterial[prop] = new THREE.MeshLambertMaterial( { color: "rgb(255, 90, 0)", vertexColors:THREE.FaceColors} );
      this.mouseHelper[prop] = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 10), this.mouseHelperMaterial[prop]);
      this.mouseHelper[prop].visible = false;
      this.scene.add(this.mouseHelper[prop]);
    }

    /*this.getLastActivePoint();*/
  }
  /**
   * Creating of  the scene (use in AfterViewInit)
   */
  private createScene(){
    /* Scene */
    this.scene = new THREE.Scene();
    /* Camera */
    this.aspectRatio = this.getAspectRatio();
    this.camera = new THREE.PerspectiveCamera(45, this.aspectRatio, 1, 1000);
    this.camera.position.z = 100;
    this.cameraTarget = new THREE.Vector3();
    /*Light*/
    this.light= new THREE.AmbientLight(0x443333);
    this.scene.add(this.light);

    this.drectionalLight1 = new THREE.DirectionalLight( 0xffddcc, 1 );
    this.drectionalLight1.position.set( 1, 0.75, 0.5 );
    this.scene.add( this.drectionalLight1 );

    this.drectionalLight2 = new THREE.DirectionalLight( 0xccccff, 1 );
    this.drectionalLight2.position.set( -1, 0.75, -0.5 );
    this.scene.add( this.drectionalLight2 );
  }
  /*Real proportions for camera (use in createScene)*/
  private getAspectRatio() {
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }
  /**
   * Start the rendering loop (use in AfterViewInit)
   */
  private startRenderingLoop() {
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    this.renderer.render(this.scene, this.camera);
    let component: CanvasComponent = this;
    this.CameraRotation();
    (function render() {
      component.animation=requestAnimationFrame(render);
      //console.log(1);
      component.renderer.render(component.scene, component.camera);
    }());

  }


  /**
   * Here we implemente Zoom and Spin of camera (use in startRenderingLoop)
   */
  public CameraRotation(){
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.25;
    this.controls.enableZoom = true;
   }
   private functionObject(name){
     return this.dataObj={
       'name':name,
       'point':this.intersects[0].point,
       'face':this.intersects[ 0 ].face.normal
     };
   }
/*
  private getLastActivePoint(){
  if(window.localStorage.length>0){
     let lastActiveObject=this.LocalStorageService.get('lastActive');
     this.itemFace=lastActiveObject.face;
     this.itemPoint=lastActiveObject.point;
     this.itemLevel=lastActiveObject.level;
     this.itemName=lastActiveObject.name;
     this.markLastPoint(this.itemFace,this.itemPoint,this.itemLevel,this.itemName);
}
   }
*/
  private getActivePoints(){
    for(let i=0; i<this.arr.length; i++){
      let prop=this.arr[i];
      if(window.localStorage.getItem(prop) != null&&window.localStorage[prop].length>0){
        //console.log(i);
        let lastActiveObject=this.LocalStorageService.get(prop);
        //console.log(lastActiveObject);
        this.itemFace=lastActiveObject.face;
        this.itemPoint=lastActiveObject.point;
        this.itemLevel=lastActiveObject.level;
        this.itemName=lastActiveObject.name;

        //console.log(lastActiveObject);
       this.markLastPoint(this.itemFace,this.itemPoint,this.itemLevel,this.itemName);
      }
    }
  }

  private markLastPoint(itemFace,itemPoint,level,itemName){
    let color:string;
    if(level==1){
      color="rgb(0, 255, 0)";
    }
    else if (level==2){
      color="rgb(255, 255, 0)";
    }
    else if (level==3){
      color="rgb(255, 80, 0)";
    }
    else if (level==4){
      color="rgb(255, 0, 0)";
    }

     let intersection = {
       intersects: false,
       point: new THREE.Vector3(),
       normal: new THREE.Vector3()
     };

    this.mouseHelperMaterial[itemName].color.set(color);
    this.mouseHelperMaterial[itemName].needsUpdate=true;

     let p = itemPoint;
     this.mouseHelper[itemName].position.copy( p );
     intersection.point.copy( p );

      itemFace=new THREE.Vector3(itemFace.x,itemFace.y,itemFace.z);
     let n = itemFace.clone();
     n.multiplyScalar( 10 );
     n.add( itemPoint );

     intersection.normal.copy( itemFace );
    this.mouseHelper[itemName].visible = true;
     this.mouseHelper[itemName].lookAt( n );

     this.line[itemName].geometry.vertices[ 0 ].copy( intersection.point );
     this.line[itemName].geometry.vertices[ 1 ].copy( n );
     this.line[itemName].geometry.verticesNeedUpdate = true;
     this.line[itemName].visible = true;
     intersection.intersects = true;
   /*}*/
  }

  private checkBodyPart(event){

/*Get position of point on 3D Object*/
    this.mouse.x = ( event.offsetX / this.renderer.domElement.clientWidth ) * 2 - 1;
    this.mouse.y = - ( event.offsetY / this.renderer.domElement.clientHeight ) * 2 + 1;
    this.raycaster.setFromCamera( this.mouse, this.camera );
    this.intersects = this.raycaster.intersectObjects( [ this.mesh ],true);
    /**/
  if(this.intersects[0]){
    /*Here we compare point position with name of body parts*/
    /*Ears*/
    if(this.intersects[0].point.x>12.5&&this.intersects[0].point.y>0&&this.intersects[0].point.y<19){
      this.functionObject('Ear Right');
      this.emitter.next(this.dataObj);

    }
    else if(this.intersects[0].point.x<-14.6&&this.intersects[0].point.y>0&&this.intersects[0].point.y<19){
      this.functionObject('Ear Left');
      this.emitter.next(this.dataObj);

    }
    /*Forehead*/
    else if(this.intersects[0].point.y>21&&this.intersects[0].point.y<31&&this.intersects[0].point.z>9){
      this.functionObject('Forehead');
      this.emitter.next(this.dataObj);

    }
    /*Top of skull*/
    else if(this.intersects[0].point.y>31){
      this.functionObject('Top of skull');
      this.emitter.next(this.dataObj);

    }
    else if(this.intersects[0].point.y>0&&this.intersects[0].point.y<=7.5&&this.intersects[0].point.x>-7&&this.intersects[0].point.x<2.5&&this.intersects[0].point.z>20){
      /*Lips*/
      this.functionObject('Lips');
      this.emitter.next(this.dataObj);

    }
    /*Nose*/
    else if(this.intersects[0].point.y>7&&this.intersects[0].point.y<14&&this.intersects[0].point.x>-8&&this.intersects[0].point.x<6&&this.intersects[0].point.z>3){
      this.functionObject('Nose');
      this.emitter.next(this.dataObj);

    }
    else if(this.intersects[0].point.y>14&&this.intersects[0].point.y<21&&this.intersects[0].point.x>-3&&this.intersects[0].point.x<1.8&&this.intersects[0].point.z>3){
      this.functionObject('Nose');
      this.emitter.next(this.dataObj);

    }
    /*Eyes*/
    else if(this.intersects[0].point.y>=14&&this.intersects[0].point.y<=21&&this.intersects[0].point.x>=1.8&&this.intersects[0].point.z>14){
      this.functionObject('Right Eye');
      this.emitter.next(this.dataObj);

    }
    else if(this.intersects[0].point.y>=14&&this.intersects[0].point.y<=21&&this.intersects[0].point.x<=-3&&this.intersects[0].point.z>14){
      this.intersects[0].face.color.setRGB(0, 0, 255);
      this.functionObject('Left Eye');
      this.emitter.next(this.dataObj);

    }
    /*Сhin*/
    else if(this.intersects[0].point.y>-7&&this.intersects[0].point.y<0&&this.intersects[0].point.z>9){
      this.intersects[0].face.color.setRGB(0, 0, 255);
      this.functionObject('Chin');
      this.emitter.next(this.dataObj);

    }
    /*Cheeks*/
    else if(this.intersects[0].point.y>-1&&this.intersects[0].point.y<14&&this.intersects[0].point.x>=6&&this.intersects[0].point.z>5){
      this.intersects[0].face.color.setRGB(0, 0, 255);
      this.functionObject('Right Cheek');
      this.emitter.next(this.dataObj);

    }
    else if(this.intersects[0].point.y>-1&&this.intersects[0].point.y<14&&this.intersects[0].point.x<0&&this.intersects[0].point.z>5){
      this.intersects[0].face.color.setRGB(0, 0, 255);
      this.functionObject('Left Cheek');
      this.emitter.next(this.dataObj);

    }
    /*Neck*/
    else if(this.intersects[0].point.y<2&&this.intersects[0].point.y>-18&&this.intersects[0].point.z<21){
      this.intersects[0].face.color.setRGB(0, 0, 255);
      this.functionObject('Neck');
      this.emitter.next(this.dataObj);

    }
    /*Body*/
    else if(this.intersects[0].point.y<-18){
	  if(this.intersects[0].point.x<-10&&this.intersects[0].point.z>-11){
		  this.functionObject('Left Shoulder');
		  this.emitter.next(this.dataObj);
			}
			else if	(this.intersects[0].point.x>8&&this.intersects[0].point.z>-11){
			this.functionObject('Right Shoulder');
			this.emitter.next(this.dataObj);
			}
			else if	(this.intersects[0].point.z<-11){
			this.functionObject('Back');
			this.emitter.next(this.dataObj);
			}
			else{
			this.functionObject('Chest');
			this.emitter.next(this.dataObj);
			}
	/**/
    }
    /*Back of the head*/
    else if(this.intersects[0].point.z<2){
      this.intersects[0].face.color.setRGB(0, 0, 255);
      this.functionObject('Back of the head');
      this.emitter.next(this.dataObj);

    }
    /*Temple*/
    else if(this.intersects[0].point.z<15){
	  this.intersects[0].face.color.setRGB(255,0,0);
	  this.functionObject('Temple');
	  this.emitter.next(this.dataObj);

    }
	else if(this.intersects[0].point.y<-7){
      this.functionObject('Neck');
      this.emitter.next(this.dataObj);

	}
    else{
      this.intersects[0].face.color.setRGB(0, 255, 0);
      this.functionObject('Lips');
      this.emitter.next(this.dataObj);

    }
    /**/
  }


  }

  /* EVENTS */
  public onDragEnter(event: DragEvent) {

  }
  public onDragLeave(event: DragEvent) {

  }
  public onDragOver(event: DragEvent) {
    event.preventDefault();

  }
  public onDrop(event: DragEvent) {
    event.preventDefault();
  }
  public onMouseDown(event: MouseEvent) {
    event.preventDefault();
    this.isUserInteracting = true;

  }

  public onMouseMove(event: MouseEvent) {
    if (this.isUserInteracting) {

    }

  }

  public onMouseUp(event: MouseEvent) {

    this.isUserInteracting = false;

  }

  public onWheel(event: MouseWheelEvent) {
  }

  /*Changing canvas size on rotation and resize */
  public onResize(event){
    this.camera.aspect=this.getAspectRatio();
    this.camera.updateProjectionMatrix();
    this.renderer.setSize( window.innerWidth, window.innerHeight );
  }
  ngAfterViewInit() {
    //console.log('ngAfterViewInit');
    //console.log(this.line);
    this.createScene();
    this.create3DObject();
    this.pinSet();
    this.startRenderingLoop();
    this.getActivePoints();
    /*this.getLastActivePoint();*/
  }

  ngOnDestroy() {
    // prevent memory leak when component is destroyed
    this.subscription.unsubscribe();
    cancelAnimationFrame(this.animation);
  }

  /*Calculating angle for MousePositionEvent*/
  public toRadians(angle) {
    return angle * (Math.PI / 180);
  }
  /**/

}
