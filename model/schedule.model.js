const mongoose=require('mongoose');
const ScheduleSchema=mongoose.Schema({
    email:{type:String,validate: {
        validator: function(v) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: props => `${props.value} is not a valid email!`
      },},
    time:{type:String},
    subject:{type:String},
    body:{type:String}
},{
    versionKey: false,
    timestamps:true
})

const Schedule=mongoose.model("Schedule",ScheduleSchema);
module.exports=Schedule;