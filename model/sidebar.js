const mongoose = require("mongoose");

const sidebarSchema = new mongoose.Schema({
  parentId: {
    type: String,
    
  },
  caption: {
    type: String,
  },
  floor: {
    type: Number,
  },
 
  row: {
    type: Number,
  },

  
});

module.exports = mongoose.model("Sidebar", sidebarSchema);
