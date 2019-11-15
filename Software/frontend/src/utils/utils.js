
class BaseStationUtils {
    // Gets the latest
    getLatest(list){

    if(list.length === 0){
        return -1;
    }

    var index = 0;
    var i = 0;
    var earliest = list[0];

    for (const item of list.entries()){
        if(item.time < earliest.time){
            index = i;
            earliest = item
        }
        i++;
    }
    return earliest;
    };

}