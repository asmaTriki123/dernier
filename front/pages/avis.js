import React, {useEffect, useState} from "react";
import Layout from "../layout/Layout";
import Delete from "../components/modal/delete/DeleteConfirmation";
function Avis() {
    const [data , setData] = useState([]);
    useEffect(async() =>{
        getAvis();
    } , [])

    async function deleteAvis(_id){
        if(window.confirm("are you sure to delete this avis")){
        let result = await fetch('http://localhost:3001/comme/deletecomt/'+_id , {
          method: 'DELETE'
        });
        result = await result.json();
        console.warn(result)
        getAvis();


        if(result){
            swal({
              title: "Supprimer avec succes",
              icon: "success",
              button: "Valider",
            });
          }
          else{
              swal({
                  title: "not deleted ",
                 
                  icon: "warning",
                  buttons: true,
                  dangerMode: true,
                });
          }




      }

    }
async function getAvis(){
    let result = await fetch("http://localhost:3001/comme/getcomm");
    result = await result.json();
    setData(result)

}
   


    return (
        <div className="">
            <section className="py-1 bg-blueGray-50 pr-10 lg:pr-0">
                <div className="w-full xl:w-11/12 mb-12 xl:mb-0 px-4 mx-5 mt-12 mr-40 lg:mr-0">
                <h1 className="text-3xl my-2" size="10px"><i><b>Liste d'avis</b></i></h1><br />
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                        <div className="rounded-t mb-0 px-4 py-3 border-0">
                            <div className="lg:flex items-center">
                                <div className="relative w-full px-4 max-w-full flex">
                                    <select className="p-2 rounded-tl-xl rounded-bl-xl   bg-gray-100 justify-start"
                                       >
                                        <option value="id">All</option>
                                        <option value="id">ID</option>
                                        <option value="type">Phone</option>
                                    </select>
                                    <div className="flex gap-x-3 rounded-tr-xl rounded-br-xl  border border-gray-100 p-2  item-center">
                                        {/* <figure className="w-5 h-5">
                                            <img src="/search_icon.svg" className="w-5 h-5"/>
                                        </figure> */}
                                        <input type="text" placeholder="Search" className="placeholder-gray-500 w-full font-medium focus:outline-none"
                                            onChange={
                                                (e) => {
                                                    setSearch(e.target.value);
                                                }
                                            }/>
                                    </div>
                            </div>
                            
                        </div>
                    </div>

                    <div className="w-full overflow-x-auto">
                        <table className="items-center  w-full border-collapse rounded-xl">
                            <thead className="rounded-xl">
                                <tr className="bg-gray-900 rounded-xl text-gray-100">
                                   
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        ID
                                    </th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                       Message
                                    </th>
                                    
                                    
                                    
                                    
                                   
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody> {
                                data.map((item) => (
                                    <tr className="font-medium">
                                       
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                            {
                                            item._id.slice(0,5)
                                        } </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                            {
                                            item.avis
                                        } </td>
                                        
                                        
                                        
                                        
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 flex">
                                            
                                        &nbsp;&nbsp;&nbsp;&nbsp; <div className="rounded-full mx-1 p-2 bg-white">
                                               <span onClick={() =>deleteAvis(item._id)}>
                                               <figure>
                              <img src="/d.jpg" width="20px" height="20px" />
                            </figure>
                                               </span>
                                             </div>
                                        </td>
                                    </tr>
                                ))
                            } </tbody>
                            
                        </table>
                    </div>
                </div>
            </div>
        </section>
    </div>
    );
}

export default Layout(Avis);




