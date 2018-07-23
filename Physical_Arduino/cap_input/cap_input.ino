#include <CapacitiveSensor.h>

CapacitiveSensor   cs_4_6 = CapacitiveSensor(4,6);        // 10M resistor between pins 4 & 6, pin 6 is sensor pin, add a wire and or foil
CapacitiveSensor   cs_4_8 = CapacitiveSensor(4,8);        // 10M resistor between pins 4 & 8, pin 8 is sensor pin, add a wire and or foil


int outData, oldData,oldVal1, oldVal2;
int diff=200;
bool isOpen;

void setup()                    
{
   Serial.begin(9600);
}

void loop()                    
{

    long val1 =  cs_4_6.capacitiveSensor(30);
    long val2 =  cs_4_8.capacitiveSensor(30);

    //if Page 1 is touched
    if(oldVal1-val1>diff){
        //if the book is closed, then turn to Page 1
        if(!isOpen){
          outData=1;
        }
        //if the book is open, then turn to the cover
        else{
         outData=0; 
        }
        isOpen=!isOpen;
    }
    
    //if Page 2 is touched
    if (oldVal2-val2>diff){
         outData=2;
      }
      
    oldVal1=val1;
    oldVal2=val2;
   
    if(oldData!=outData){
      Serial.write(outData);
      oldData=outData;
    }
    delay(50);
}
