const multer=require('multer');
const uuid=require('uuid').v4;
const path = require('path');
const files=[];
const fileInArray=[]
const controllerDecl = require("../controllers/decl.controller");
const db = require("../models");
//~<--------------------STORAGE for IMAGE------------------>


//^   DESTINATION & STORAGE -------->  !   ORIGINAL FILENAME

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"uploads")
    },
    filename:(req,file,cb)=>{
        let filePath=[];
        const ext = path.extname(file.originalname);
        const id = uuid();
        filePath = `${id}${ext}`;
        fileInArray.push([(filePath)])       
        files.push(fileInArray)   
        cb(null,filePath)       
    }
})
const upload=multer({
    fileFilter: (req, file, cb) => {
            cb(null, true);
    },
    storage:storage,
})

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post('/api/decl',upload.array("uploaded_Image",100),(req,res)=>{
    createDeclaration(req,res,fileInArray)
  })
  app.get('/api/decl',controllerDecl.getAllDeclarationResp)
  app.post('/api/decl/devis',upload.array("uploaded_Image",5),(req,res)=>{
    addDevis(req,res,fileInArray)
  })
  app.post('/api/decl/update',controllerDecl.addExpert)
  app.get('/api/decl/:id',controllerDecl.getAllDeclaration)
  app.get('/api/decl/one/:id',controllerDecl.getByIdDeclaration)
  app.get('/api/declExpert/:id',controllerDecl.getAllDeclarationExpt)
  app.get('/api/declClient/:id',controllerDecl.getAllDeclarationClient)
  app.get('/api/getDevis/:id',controllerDecl.getDevisById)
  app.get('/api/download/:id',controllerDecl.updateRecl)
  const addDevis = async (req, res,devis) => {
    db.Declaration.findById(req.body.id).populate("File", "-__v",'User')
    .exec(async (err, user) => {
      const file={
        url: devis[0].toString(),
        createdAt: Date.now()
      };
      const devisNew=await db.Devis.create(file);
      user.devis = devisNew._id;
      user.dateDevis = Date.now();
      await user.save();
      const newDeclaration =await db.Declaration.findById(req.body.id)
      files.length=0
      fileInArray.length=0
      return res.json(newDeclaration)
    });
  }
  app.post('/rapport',upload.array("uploaded_Image",5),(req,res)=>{
    addRapport(req,res,fileInArray)
  })
  const addRapport = async (req, res,devis) => {
    db.Declaration.findById(req.body.id).populate("File", "-__v",'User')
    .exec(async (err, user) => {
      const file={
        url: devis[0].toString(),
        createdAt: Date.now()
      };
      const devisNew=await db.Devis.create(file);
      user.rapport = devisNew;
      await user.save();
      const newDeclaration =await db.Declaration.findById(req.body.id)
      files.length=0
      fileInArray.length=0
      return res.json(newDeclaration)
    });
  }
  const createDeclaration = (req, res,nameImages) => {
    const Declaration={
        nom: req.body.Nom,
        prenom: req.body.Prenom,
        telephone: req.body.Telephone,
        email: req.body.email,
        adresse: req.body.Adresse,
        date: req.body.Date,
        matricule: req.body.Matricule,
        Commentaire:req.body.Commentaire,
        Expert : null,
        Devis : null
    };
  return db.Declaration.create(Declaration).then(async docDeclaration => {
      await createImage(docDeclaration._id,nameImages,req.body.userId)
    const newDeclaration =await db.Declaration.findById(docDeclaration._id).populate('File','User');
    return res.json(newDeclaration);
  });
};

const createImage = async function(DeclarationId, image,userId) {
  const ListImage=[]
  for (const element of image)
  {
    const img={
      url: element.toString(),
      createdAt: Date.now()
    };
    ListImage.push(img)
  }
  files.length=0
  fileInArray.length=0
  const newDeclaration =await db.Declaration.findById(DeclarationId)
  newDeclaration.files = ListImage;
  newDeclaration.user = [userId];
  return newDeclaration.save();
};
};