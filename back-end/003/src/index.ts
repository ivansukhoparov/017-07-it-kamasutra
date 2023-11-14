import express, {Request,Response} from "express";

const app = express();
const port :5000 = 5000;
const jsonBodyMiddleware = express.json();
app.use(jsonBodyMiddleware);

const HTTP_STATUSES={
   OK_200:200,
   CREATED_201:201,
   NO_CONTENT_204:204,

    BAD_REQUEST_400:400,
   NOT_FOUND_404:404
}

const db ={
    courses: [
        {id:1, title:"frontend"},
        {id:2, title:"backend"},
        {id:3, title:"prev"},
        {id:4, title:"ghost"},
        {id:5, title:"post"},
    ]
} ;


app.get("/courses", (req:Request,res:Response)=>{

    let foundedCourses = db.courses;

    if (req.query.title){
        foundedCourses=foundedCourses.filter((course=> course.title.indexOf(req.query.title as string)>-1));
    };

    res.json(foundedCourses);
})

app.get("/courses/:id", (req:Request,res:Response)=>{
   const  id = +req.params.id;
   const foundedCourse = db.courses.find(course => course.id === id);

    if (!foundedCourse){
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return
    }
    res.json(foundedCourse);
})

app.post("/courses", (req:Request,res:Response)=>{
    const id = +new Date();
    const title = req.body.title;

    if (!title){
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
        return
    }
    const newCourse = {
        id: id,
        title:title
    };
    db.courses.push(newCourse);
    res.status(HTTP_STATUSES.CREATED_201).json(newCourse);
})

app.delete("/courses/:id", (req:Request,res:Response)=>{
    const  id = +req.params.id;
    const courseIndex = db.courses.findIndex(course => course.id === id);
    console.log(courseIndex)
    if (courseIndex<=-1){
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return
    }

    db.courses.splice(courseIndex,1)

    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
})

app.put("/courses/:id", (req:Request,res:Response)=>{
    const title = req.body.title;
    if (!title){
        res.status(HTTP_STATUSES.BAD_REQUEST_400).json({message:"title is required"})
        return;
    }

    const  id = +req.params.id;
    const foundedCourse = db.courses.find(course => course.id === id);

    if (!foundedCourse){
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    }
    foundedCourse.title=title;
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
})

app.listen(port, ()=>{
    console.log(`app start on port ${port}`);
    console.log(`open in browser http://localhost:${port}`);
})