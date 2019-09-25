({
    getStartValues: function(component, event, helper) {
        component.set('v.startPointBool', true);
        component.set('v.endPointBool', false); 
        component.set('v.distanceBool', true);  
        var id;
        var StartLat;
        var StartLong;
        var changedLat;
        var changedLong;       
        
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position1) {
                StartLat = position1.coords.latitude;
                StartLong = position1.coords.longitude;
                console.log('starting lat ',StartLat);
                console.log('Starting long ',StartLong);
                component.set("v.sLat",StartLat);
                component.set("v.sLong",StartLong);            
            });         
            
            id = navigator.geolocation.watchPosition(function(position2){
                changedLat = position2.coords.latitude;
                changedLong = position2.coords.longitude;
                var endButtonID = component.find('endButton');
                if(!endButtonID){
                    while((changedLat>StartLat || changedLat<StartLat) && (changedLong>StartLong || changedLong<StartLong)){
                        
                       helper.findDistance(component,event,helper,StartLat,StartLong,changedLat,changedLong);
                    }  
                    StartLat = changedLat;
                    StartLong = changedLong;
                    changedLat = position2.coords.latitude;
                    changedLong = position2.coords.longitude;
                    
                }else{
                    navigator.geolocation.clearWatch(id);
                    
                    StartLat = changedLat;
                    StartLong = changedLong;
                    changedLat = component.get("v.eLat");
                    changedLong = component.get("v.eLong");        
                    helper.findDistance(component,event,helper,StartLat,StartLong,changedLat,changedLong);
                }                  
            });       
        } else {
            console.log('Your browser does not support GeoLocation');
        }
    },
    
    getEndValues: function(component, event, helper) {
        component.set('v.startPointBool', true);
        component.set('v.endPointBool', true);
        component.set('v.distanceBool', false);  
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var StartLat = position.coords.latitude;
                var StartLong = position.coords.longitude;
                console.log('ending lat ',StartLat);
                console.log('Starting long ',StartLong);        
                component.set("v.eLat",StartLat);
                component.set("v.eLong",StartLong);            
            });
        } else {
            console.log('Your browser does not support GeoLocation');
        }        
    },
    
    getDistance: function(component, event, helper) {
        component.set('v.endPointBool', true);
        component.set('v.distanceBool', true);              
        component.set('v.startPointBool', false);
        var action = component.get("c.showDistance");
        
        action.setCallback(this, function(response) {
            var state = response.getState(); 
            if(state === "SUCCESS"){
                var dist = response.getReturnValue();
                component.set("v.distance",dist);                             
            }
        });
        $A.enqueueAction(action);                    
        
    },   
})
