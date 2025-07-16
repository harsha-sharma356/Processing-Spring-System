
final float delta = 600;
class Particle{
  PVector vector; PVector prev_vector; PVector net_force_vector; int radius;
  Particle(int x, int y){ 
    this.vector = new PVector(x, y);
    this.prev_vector = new PVector(x, y);
    this.net_force_vector = new PVector(0, 0);
    this.radius = 20;
  }
  
  void simulate_Effect(){
    PVector buffer = this.vector.copy();
    PVector deltaV = (this.vector.copy().sub(this.prev_vector));
    //if (this.vector.copy().add(deltaV.copy().add(this.net_force_vector.copy())).y < 1000){
      this.vector = this.vector.add(deltaV.add(this.net_force_vector.mult(pow(1/frameRate*0.5, 2))));
      this.prev_vector = buffer;
   // }
    //else{
      //this.vector = this.prev_vector;
      //this.prev_vector = buffer;
      // this.vector = this.vector.add(deltaV.sub(this.net_force_vector.mult(pow(1/frameRate*0.5, 2))));
    //}
    //this.vector.y = min(1000, this.vector.y);
  }
  
  
  void addForce(PVector force){
    this.net_force_vector.add(force);
  }
  
  
  void clearForce(){
  this.net_force_vector.set(new PVector(0,0));
  }
  
  void drawTheDamnThing(){
    ellipse(this.vector.x, this.vector.y, this.radius, this.radius);
  }
}





class Spring{
  Particle p1; Particle p2; int originalLen; float k; float damping;
  Spring(Particle p1, Particle p2,int originalLen){
    this.p1 = p1;
    this.p2 = p2;
    this.originalLen = originalLen;
    this.k = 20;
    this.damping = 0.9;
  }
  void simulate_Effect(){
    PVector forp1 =PVector.sub(this.p1.vector.copy(), this.p2.vector.copy());
    this.p1.addForce(forp1.normalize().mult(this.k*(this.originalLen-this.calculateDisplacement())));
    
    PVector forp2 = PVector.sub(this.p2.vector.copy(), this.p1.vector.copy());
    this.p2.addForce(forp2.normalize().mult(this.k*(this.originalLen-this.calculateDisplacement())));
  }
  
  float calculateDisplacement(){
  return this.p1.vector.copy().dist(this.p2.vector);
  }
  
  void drawTheDamnThing(){
    line(this.p1.vector.x, this.p1.vector.y, this.p2.vector.x, this.p2.vector.y);
  }
}



ArrayList<Particle> list = new ArrayList();
ArrayList<Spring> springs = new ArrayList();
Spring spr;
Particle particle;
void setup() {
  frameRate(30);
  size(1000,1000);
  for (int i = 0; i < 4; i++){
    list.add(new Particle(400+i*60, 300+i*(int)pow((-2),i)));
  }
  
  for (int i = 0; i < list.size()-1; i++){
     springs.add(new Spring(list.get(i), list.get(i+1), 100));
  }
  springs.add(new Spring(list.get(0), list.get(list.size()-1), 100));
}




void draw() {
  background(100); 
  for (int i = 0; i < list.size(); i++){
     Particle particle = list.get(i);
     particle.addForce(new PVector(0, delta));
     particle.clearForce();
     //particle.addForce(new PVector(0, delta)); 
     
  }
  
  for (int i = 0; i < springs.size(); i++){
     springs.get(i).simulate_Effect();
  }
  
  for (int i = 0; i < list.size(); i++){
     Particle particle = list.get(i);
     particle.simulate_Effect();
  }
  
  for (int i = 0; i < list.size(); i++){
     Particle particle = list.get(i);
     particle.drawTheDamnThing();
  }
  
  for (int i = 0; i < springs.size(); i++){
     springs.get(i).drawTheDamnThing();
  }
    
}
