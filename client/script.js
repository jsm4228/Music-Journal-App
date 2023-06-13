// Load data to Data Div, append Divs as needed


const saveToDatabase = async(id) => {
    console.log(id)
    let attribute = id.substring(0, id.indexOf('-'))
    let object_id = id.substring(id.indexOf('-')+1)
    let value = document.querySelector(`#${id}`).innerText
    console.log(object_id, attribute, value)

    await axios.post(`http://localhost:3001/api/session/${object_id}/${attribute}/${value}`)
}


const loadData = async () => {
    //get data
    const response = await axios.get('http://localhost:3001/api/session')
    const data = response.data
    
    //define new divs
    const databaseDiv = document.querySelector('.data')
    let dataEntryDiv
    let dataAttrDiv
    //loop based on length of data
    data.forEach((entry) => {

        dataEntryDiv = document.createElement('div')
        dataEntryDiv.classList.add('data-entry')
        databaseDiv.appendChild(dataEntryDiv)

        for (const property in entry) {
            if(property!='user_id' && property!='_id' && property!='updatedAt' && property!='createdAt' && property!='__v' && property!='notes'){
                dataAttrDiv = document.createElement('div')
                dataAttrDiv.classList.add('data-attr')
                dataAttrDiv.id = `${property}-${entry._id}`
                dataAttrDiv.contentEditable = true
                
                let id = dataAttrDiv.id
                //allows the enter key to save the new data in the attribute
                dataAttrDiv.addEventListener("keydown", async (event)=>{
                    if (event.key === "Enter") {
                      event.preventDefault() // Prevents line break
                      // Call your save function here
                    //   const boundSaveToDatabase = saveToDatabase.bind(this)
                    //   await boundSaveToDatabase()
                    
                    await saveToDatabase(id)
                    }
                  })

                dataEntryDiv.appendChild(dataAttrDiv)
                property=='song_id' ? dataAttrDiv.innerText = entry[property].song_name : dataAttrDiv.innerText = entry[property]
            
            }   
        }

    })

}

loadData()
























// animation section

const scrollAnim = document.querySelectorAll('.animation')

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('scroll-animation')
        }
            else {
                entry.target.classList.remove('scroll-animation')
            }
        
    })
})


for (let i in scrollAnim) {
    const elements = scrollAnim[i]
    observer.observe(elements)
} 