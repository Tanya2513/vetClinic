

function CreatePatient() {
    return (
       <div>
           <form method={'POST'} action={'http://localhost:5000/patient'}>
               <input type="text" name="name"/>
               <input type="text" name="age"/>
               <input type="text" name="species"/>
               <button type={"submit"}>Зберегти</button>
           </form>
            create
       </div>
    );
}

export default CreatePatient;
