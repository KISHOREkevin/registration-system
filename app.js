const express = require("express");
const bodyParser=require("body-parser");
const ejs = require("ejs");
const app= express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
let details ={
	name:[],
	phno:[],
	yoe:[]
}
app.get("/",(req,res)=>{
	res.render("index");
	
})
app.get("/table",(req,res)=>{
	res.render("register",{regname:details.name,phno:details.phno,yoe:details.yoe});

	
})
app.get("/delete",(req,res)=>{
	res.render("delete");
})
app.get("/update",(req,res)=>{
	res.render("update");
})
app.get("/error",(req,res)=>{
	res.render("error");
})

app.post("/",(req,res)=>{
	let regname = req.body.regname;
	let phno = req.body.phno;
	let yoe = req.body.years;
	details.name.push(regname);
	details.phno.push(phno);
	details.yoe.push(yoe);
	res.redirect("/");

})
app.post("/delete",(req,res)=>{
	let deletedname = req.body.deletename;
	if(deletedname>details.name.length){
		res.redirect("/error");
	}else{
		details.name.splice(deletedname-1,1);
		details.phno.splice(deletedname-1,1);
		details.yoe.splice(deletedname-1,1);
		res.redirect("/table");
	}
	
})

app.post("/update",(req,res)=>{
	let idno = req.body.idno;
	let reph = req.body.reph;
	let reyoe = req.body.reyoe;
	let rename = req.body.rename;
	if (idno>details.name.length) {
		res.redirect("/error");
	}else{
		details.name[idno-1]=rename;
		details.phno[idno-1]=reph;
		details.yoe[idno-1]=reyoe;
		res.redirect("/table");
	}	

})
app.get("/deleteall",(req,res)=>{
	details.name.splice(0);
	details.phno.splice(0);
	details.yoe.splice(0);
	res.redirect("/table");
})
app.listen(PORT,()=>{
	console.log("server started @ port : 3000");
})