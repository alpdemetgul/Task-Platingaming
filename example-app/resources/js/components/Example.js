import React, { Component } from 'react';

import './app.css';
import ReactDOM from 'react-dom';


import axios from 'axios'


class Example extends Component {


  state = {
    venues: [],
    category:[],
    
  }
  

  componentDidMount() {
    this.getVenues("drink")
    this.getCategories()
    
    
    
  }
  

  
  getCategories= () => {
    const endPoint="https://api.foursquare.com/v2/venues/categories?"
    const parameters={
        client_id: "BG4M4WQYBSE1Y1FVW4PUUJAJSBASFOOL5W4JFR2G1DESLPU5",
        client_secret: "A4GACY0O1POHXXWXPN4ZUPA5LJFOUPEX3BLPVZ53CHQA5KG5",
        v: "20182507",
        locale:"en"
    }
    

  
  axios.get(endPoint + new URLSearchParams(parameters))
  .then(response => {
    this.setState({
        category:response.data.response.categories,
        
    })
   
    
  })
  .catch(error => {
    console.log("ERROR!! " + error)
  })


  }

  buttonValue = (event) => {
    event.preventDefault()
      
      
      this.getVenues(event.target.value)
  }
  
 
  

  renderMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyD1DrDBUd6GNL2EIBCxK-K0OjkTny8kbuA&callback=initMap")
    window.initMap = this.initMap
  }

  getVenues = (category) => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore?"
    const parameters = {
      client_id: "BG4M4WQYBSE1Y1FVW4PUUJAJSBASFOOL5W4JFR2G1DESLPU5",
      client_secret: "A4GACY0O1POHXXWXPN4ZUPA5LJFOUPEX3BLPVZ53CHQA5KG5",
      ll:"35.8997,14.5147",
      query:`${category}` ,
     near: "Valetta",
      v: "20182507"
    }
    

    axios.get(endPoint + new URLSearchParams(parameters))
      .then(response => {
        this.setState({
          venues: response.data.response.groups[0].items
        }, this.renderMap()) 
      })
      .catch(error => {
        console.log("ERROR!! " + error)
      })

  }
 

  initMap = () => {

    
    var map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 35.8997, lng: 14.5147},
      zoom: 13 
    })

    
    var infowindow = new window.google.maps.InfoWindow()

   
    this.state.venues.map(myVenue => {

      var contentString = `${myVenue.venue.name}`
      
      
      var marker = new window.google.maps.Marker({
        position: {lat: myVenue.venue.location.lat , lng: myVenue.venue.location.lng},
        map: map,
        title: myVenue.venue.name
      })

      
      marker.addListener('click', function() {

        
        infowindow.setContent(contentString)

        
        infowindow.open(map, marker)
      })

    })

    

  }

  render() {
    const foursquareCategories=this.state.category.map(cate =>{
      
     return ( <button className="list" id="ab" value={cate.name} onClick={this.buttonValue} >{cate.name}</button>

     )

     }) 
    return (
      <main>
        <div id="flex">
        <ul id="info"  >{foursquareCategories}</ul>
        <section id="map">
        </section>
        </div>
       
      </main>
    )
  }
}

function loadScript(url) {
  var index  = window.document.getElementsByTagName("script")[0]
  var script = window.document.createElement("script")
  script.src = url
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script, index)
}

export default Example;

if(document.getElementById('root')){
  ReactDOM.render(<Example />,document.getElementById('root'));
}
