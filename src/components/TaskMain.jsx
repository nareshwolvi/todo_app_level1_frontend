import React, { useCallback, useEffect, useState } from "react";
import NoTask from "./NoTask";
import CreateTask from "./CreateTask";
import EditTask from "./EditTask";
import TaskList from "./TaskList";
import ViewTask from "./ViewTask";
import DeleteTask from "../ui/DeleteTask";
import Loading from "../ui/Loading";
import fetchTaskAPI from "./api/fetchTasks";

// This is Parent Component
export default function TaskMain(){

    // We Manage the current Screen/routing through state in a single page application 

    // States needed to change from one page to next page
    const [currComponent, setCurrComponent] = useState("loading");
    const [tasks, setTasks] = useState([]);  //tasks -> comming from fetchAPI
    const [activeTask, setActiveTask] = useState();

    // This all functions below telling u what does the setCurrComponent() value will have

   const showNoTaskScreen = useCallback(function(){
    setCurrComponent("noTask");
   }, []);

   const showTaskListScreen = useCallback(function(){
    setCurrComponent("taskList");
   }, []);

   const showCreateTaskScreen = useCallback(function(){ 
    setCurrComponent("createTask");
   }, []);

   const showEditTaskScreen = function(){
    setCurrComponent("editTask");
   }

   const showViewTaskScreen = function(){
    setCurrComponent("viewTask");
   };

// handleResponse -> function surrounded by/wrote inside  useCallback() function with dependency array
   const handleResponse = useCallback(
    function(responseData){
    const extractedTasks = responseData.tasks;
    setTasks(extractedTasks);
    if(extractedTasks.length){
        showTaskListScreen();
    }
    else{
        showNoTaskScreen();
    }
   },[showTaskListScreen, showNoTaskScreen]);

// handleError
   function handleError(errorMessage){
    alert(errorMessage);
    console.log(errorMessage);
   }

// fetchAllTasks
//const fetchAllTasks = function(){fetchTaskAPI(handleResponse, handleError);};   //Method-1
// use useCallback                                                                //Method-2

const fetchAllTasks = useCallback(function(){
    fetchTaskAPI(handleResponse, handleError);
},[handleResponse]);


// Initial Effect(Side effects -> getting data from server) -> useEffect will have function-> {} and dependency array-> []
// this useEffect() is goi
    useEffect(() => {
        fetchAllTasks();
    }, [fetchAllTasks]);


    return(
    <>
    {currComponent === "loading" && <Loading />}

    <div id="contaier-div">
        {currComponent === "noTask" && (<NoTask showCreateTaskScreen={showCreateTaskScreen} />)}
        {currComponent === "taskList" && <TaskList  tasks={tasks} 
                                                    fetchAllTasks={fetchAllTasks} 
                                                    showViewTaskScreen={showViewTaskScreen}   
                                                    showCreateTaskScreen={showCreateTaskScreen}
                                                    showEditTaskScreen={showEditTaskScreen}
                                                    setActiveTask={setActiveTask}
                                                    
                                        />}
        {currComponent === "createTask" && (<CreateTask showTaskListScreen={showTaskListScreen} 
                                                        fetchAllTasks={fetchAllTasks}/>)}
        {currComponent === "viewTask" && <ViewTask  task={activeTask}
                                                    setActiveTask={setActiveTask}
                                                    fetchAllTasks={fetchAllTasks}
                                                    showEditTaskScreen={showEditTaskScreen}
                                                    showTaskListScreen={showTaskListScreen}
                                                    
                                        />}
        {currComponent === "editTask" && (<EditTask  task={activeTask} 
                                                    fetchAllTasks={fetchAllTasks} 
                                                    showTaskListScreen={showTaskListScreen} />)}
    </div>
    </>
     ) ;
}