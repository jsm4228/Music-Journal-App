// Load data to Data Div, append Divs as needed
//const Chart = require(`chart.js`)

// import { Chart } from "chart.js"

// const chart = require("./visual.js")


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





//data visualization section 

const ctx = document.querySelector('#line-graph').getContext('2d')
const piectx = document.querySelector('#pie-graph').getContext('2d')
let graph
let graph_type = 'line'
const getAttributes = async (attribute) => {
    let data = await axios.get(`http://localhost:3001/api/session/${attribute}`)
    return data 
}

//get data for y axis
const displayGraph = async (X, Y) => {
    let show
    X=='date' ? show=false : show=true
    const labels = await getAttributes(X)
    let labels_data = labels.data.sort()
    const X_data = await getAttributes(Y)
    const data = {
        labels: labels_data,
        datasets: [
            {
                data: X_data.data,
                label: `${X} vs. ${Y}`
            },
        ],
    }

    const config = {
        type: document.querySelector('#select-graph').value,
        data: data,
        options: {
            responsive: true,
            scales: {
                x: {
                  display: show // Hide x-axis labels
                },
                y: {
                  display: true // Hide y-axis labels
                }
              }
        }
    }
    console.log(labels_data, X_data.data)

    graph = new Chart(ctx, config)
   //return config
    
}

const displayPieChart = async () => {
    const apiSongs = await getAttributes('song_id')
    const songs = apiSongs.data
    const apiDurations = await getAttributes('duration')
    const durations = apiDurations.data

    const song_names = []
    let duration_times = []
    songs.forEach((song, index) => {
         if (song_names.indexOf(song.song_name) == -1)
        {
            song_names.push(song.song_name)
            duration_times.push(durations[index])
        } else {
            duration_times[song_names.indexOf(song.song_name)]+=durations[index]
        }
    })
    console.log(song_names, duration_times)
       
    const data = {
        labels: song_names,
        datasets: [{
          label: 'Time spent playing Songs',
          data: duration_times,
          backgroundColor: [
            'rgb(52, 235, 207)',
            'rgb(180, 204, 200)',
            'rgb(67, 145, 101)',
            'rgb(26, 31, 28)',
            'rgb(34, 50, 99)',
            'rgb(91, 128, 240)',
            'rgb(92, 93, 97)',
            'rgb(117, 92, 153)'
          ],
          hoverOffset: 4
        }]
      };

    const config = {
        type: 'doughnut',
        data: data,
      };
      pieGraph = new Chart(piectx, config)

}
displayPieChart()
const generateButton = document.querySelector('#generate-graph')
generateButton.addEventListener('click', () => {
    // document.querySelector('#line-graph').destroy()

    if (typeof graph !== 'undefined') {
        // Destroy the existing chart
        graph.destroy();
      }

    let x = document.querySelector('#x-attr').value
    let y = document.querySelector('#y-attr').value
    console.log(x)
    displayGraph(x, y)
    //const graph = new Chart(ctx, config)
})

const form = document.getElementById('select-graph');

form.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission

  // Access selected option value
  const selectedOption = form.elements['select-graph'].value;

  // Perform desired actions with the selected option value
  graph_type = selectedOption
  console.log(selectedOption)
  // Additional code here...

  // Submit the form programmatically (if needed)
  // form.submit();
});



















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


