const appointmentHelpers = {
    date: function(){
        const today = new Date();
        let d = today.getDate();
        let m = today.getMonth();
        if(d < 10){
            d = ('0' + d).slice(-2)
        }
        if(m + 1 < 10){
            m = ('0' + (m + 1)).slice(-2);
        }
        const date = today.getFullYear() + "-" + (m) + "-" + d;
        return date
    },
    newDate: function(){
        var today = new Date(+new Date + 12096e5);
        let d = today.getDate();
        let m = today.getMonth();
        if(d < 10){
            d = ('0' + d).slice(-2)
        }
        if(m + 1 < 10){
            m = ('0' + (m + 1)).slice(-2);
        }
        const date = today.getFullYear() + "-" + (m) + "-" + d;
        return date
    }
}

export default appointmentHelpers