({
	findDistance : function(component,event,helper,StartLat,StartLong,changedLat,changedLong) {
		 var action = component.get("c.getDist");
                        
                        action.setParams({startlat : StartLat,
                                          startlong : StartLong,
                                          stoplat : changedLat,
                                          stoplong : changedLong
                                         });
                        action.setCallback(this, function(response) {
                            var state = response.getState(); 
                            if(state === "SUCCESS"){
                                var dist = response.getReturnValue();
                                component.set("v.distance",dist); 
                                component.set("v.sLat",'');
                                component.set("v.sLong",'');
                                component.set("v.eLat",'');
                                component.set("v.eLong",'');
                                
                                // var cmpTarget = component.find('Modalbox1');                            
                            }
                        });
                        $A.enqueueAction(action);                    
	}
})
