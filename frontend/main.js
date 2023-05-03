async function getAllBands()
{
    //fetch all data from the rest API
    const response =await fetch('http://localhost:3000/bands');
    //convert data to json
    const data =await response.json();
    //Display the data
    showBands(data);
}
function showBands(bands)
{
    //create  html for each band
     let html='';
     for(let{name,genre} of bands)
     {
        html += `<p> ${name} - ${genre} </p>`;
     }
     //show html iin browser//
     document.querySelector('#bands').innerHTML = html;
    
}

async function addBand()
{
    //attach event listener to form
    document.getElementById('bandForm').addEventListener('submit',async(event)=>
    {
        //prevent default behaviour of form
        event.preventDefault();
        //Get name and genre from input fields

        const name =document.getElementById('bandName').value;
        const genre =document.getElementById('bandGenre').value;

        console.log(name, genre);
   //creating object to send through post request
        const band =
        {

             name :name,
             genre:genre
    };

    //post request
    const response=await fetch ('http://localhost:3000/bands',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(band)
    } );

    //convert response
    const result =await response.json();
    //log result
    console.log(result);
    //show bands again
    getAllBands();
});
} 

addBand();
getAllBands();