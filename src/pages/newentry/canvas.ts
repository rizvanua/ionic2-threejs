import {Component, AfterViewInit, ElementRef, Input, ViewChild, HostListener} from '@angular/core';
import * as THREE from 'three';
import OrbitControls from 'three-orbitcontrols';//module for rotation camera
import {EmitterService} from "../../services/EmitterService";//Initialization of emitter to pass data into parent component (see NewentryPage)
/*
 Generated class for the Newentry page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'three-d-scene',
  templateUrl:  'canvas.html'
})
export class CanvasComponent implements AfterViewInit {

  /* PROPERTIES FOR SCENE AND MANIPULATING OF OBJECT (PRIVATE PROPERTIES) */
  /*Main properties*/
  @ViewChild('canvas')
  private canvasRef: ElementRef;
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

  /*user interaction properties*/
  private intersects: any;
  private raycaster: THREE.Raycaster;
  private mouse: THREE.Vector2;
  private loader: THREE.JSONLoader;
  private cameraTarget: THREE.Vector3;
  @Input()
  public controls: any;
  private isUserInteracting: boolean = false;



/*Get name of body part by click*/
  @HostListener('click', ['$event'])
  onClick(event) {
    event.preventDefault();
    this.checkBodyPart(event);
  }

  constructor(private emitter:EmitterService) {}

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
        requestAnimationFrame(render);
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
  private checkBodyPart(event){

/*Get position of point on 3D Object*/
    this.mouse.x = ( event.offsetX / this.renderer.domElement.clientWidth ) * 2 - 1;
    this.mouse.y = - ( event.offsetY / this.renderer.domElement.clientHeight ) * 2 + 1;
    this.raycaster.setFromCamera( this.mouse, this.camera );
    this.intersects = this.raycaster.intersectObjects( [ this.mesh ],true);


    /*Here we compare point position with name of body parts*/
    /*Ears*/
    if(this.intersects[0].point.x>12.5&&this.intersects[0].point.y>0&&this.intersects[0].point.y<19){
      this.intersects[0].face.color.setRGB(0, 0, 255);
      this.emitter.next('Ear Right');

    }
    else if(this.intersects[0].point.x<-14.6&&this.intersects[0].point.y>0&&this.intersects[0].point.y<19)
    {
      this.intersects[0].face.color.setRGB(0, 0, 255);
      this.emitter.next('Ear Left');

    }
    /*Forehead*/
    else if(this.intersects[0].point.y>21&&this.intersects[0].point.y<31&&this.intersects[0].point.z>9){
      this.intersects[0].face.color.setRGB(0, 0, 255);
      this.emitter.next('Forehead');

    }
    /*Top of skull*/
    else if(this.intersects[0].point.y>31){
      this.intersects[0].face.color.setRGB(0, 0, 255);
      this.emitter.next('Top of skull');

    }
    else if(this.intersects[0].point.y>0&&this.intersects[0].point.y<=7.5&&this.intersects[0].point.x>-7&&this.intersects[0].point.x<2.5){
      /*Lips*/
      this.intersects[0].face.color.setRGB(0, 0, 255);
      this.emitter.next('Lips');

    }
    /*Nose*/
    else if(this.intersects[0].point.y>7&&this.intersects[0].point.y<14&&this.intersects[0].point.x>-8&&this.intersects[0].point.x<6&&this.intersects[0].point.z>3){
      this.intersects[0].face.color.setRGB(0, 0, 255);
      this.emitter.next('Nose');

    }
    else if(this.intersects[0].point.y>14&&this.intersects[0].point.y<21&&this.intersects[0].point.x>-3&&this.intersects[0].point.x<1.8&&this.intersects[0].point.z>3){
      this.intersects[0].face.color.setRGB(0, 0, 255);
      this.emitter.next('Nose');

    }
    /*Eyes*/
    else if(this.intersects[0].point.y>=14&&this.intersects[0].point.y<=21&&this.intersects[0].point.x>=1.8&&this.intersects[0].point.z>14){
      this.intersects[0].face.color.setRGB(0, 0, 255);
      this.emitter.next('Right Eye');

    }
    else if(this.intersects[0].point.y>=14&&this.intersects[0].point.y<=21&&this.intersects[0].point.x<=-3&&this.intersects[0].point.z>14){
      this.intersects[0].face.color.setRGB(0, 0, 255);
      this.emitter.next('Left Eye');

    }
    /*Сhin*/
    else if(this.intersects[0].point.y>-7&&this.intersects[0].point.y<0&&this.intersects[0].point.z>9){
      this.intersects[0].face.color.setRGB(0, 0, 255);
      this.emitter.next('Chin');

    }
    /*Cheeks*/
    else if(this.intersects[0].point.y>-1&&this.intersects[0].point.y<14&&this.intersects[0].point.x>=6&&this.intersects[0].point.z>5){
      this.intersects[0].face.color.setRGB(0, 0, 255);
      this.emitter.next('Right Cheek');

    }
    else if(this.intersects[0].point.y>-1&&this.intersects[0].point.y<14&&this.intersects[0].point.x<0&&this.intersects[0].point.z>5){
      this.intersects[0].face.color.setRGB(0, 0, 255);
      this.emitter.next('Left Cheek');

    }
    /*Neck*/
    else if(this.intersects[0].point.y<6&&this.intersects[0].point.y>-18&&this.intersects[0].point.z<17){
      this.intersects[0].face.color.setRGB(0, 0, 255);
      this.emitter.next('Neck');

    }
    /*Body*/
    else if(this.intersects[0].point.y<-18){
      this.intersects[0].face.color.setRGB(0, 0, 255);
      this.emitter.next('Body');

    }
    /*Back of the head*/
    else if(this.intersects[0].point.z<2){
      this.intersects[0].face.color.setRGB(0, 0, 255);
      this.emitter.next('Back of the head');

    }
    /*Temple*/
    else if(this.intersects[0].point.z<15){
      this.intersects[0].face.color.setRGB(255,0,0);
      this.emitter.next('Temple');

    }
    else{
      this.intersects[0].face.color.setRGB(0, 255, 0);
      this.emitter.next('Lips');

    }
    /**/


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
  public ngAfterViewInit() {
    this.createScene();
    this.create3DObject();
    this.startRenderingLoop();
  }

  /*Calculating angle for MousePositionEvent*/
  public toRadians(angle) {
    return angle * (Math.PI / 180);
  }
  /**/

}
