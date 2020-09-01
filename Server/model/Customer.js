const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    IDNumber:{
        type: String,
        required: true
    },
    name:{
        type: String,
    
    },
    fatherName:{
        type: String,
        
    },
    AFM:{
        type: String,
    
    },
    city:{
      type: String,
      
    },
    address:{
        type: Object,
  
    },
    phone: {
        type: Object,
       
    },
    email: {
        type: Object,
  
    },
    machines: [{
        category: String,
        manufacturer: String,
        commercialName: String,
        serialNumber: String,
        age: String,
        standards: String,
        tankNumber: String,
        tankCapacity: String,
        nozzleNumber: String,
        armLength: String,
        region: String,
        inspectionDate: String,
        coOwners: [{
            name: String,
            fatherName: String,
            AFM: String,
            city: String,
            address: String,
            phone: String,
            email: String,
            percentage: String
        }]
    }]
    
});

module.exports = mongoose.model('Customer', customerSchema, "Customers");