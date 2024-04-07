<template>
    <div class="pt-16">
        <h1 class="text-3xl font-semibold mb-4">Here's your trip</h1>
        <form>
            <div class="overflow-hidden shadow sm:rounded-md max-w-sm mx-auto text-left">
                <div class="bg-white px-4 py-5 sm:p-6">
                    <div>
                        <GMapMap v-if="location.destination.name !== ''" :zoom="11" :center="location.destination.geometry"
                            ref="gMap"
                            style="width: 100%;height: 256px;">
                            <GMapMarker :position="location.destination.geometry"/>
                        </GMapMap>
                    </div>
                    <div class="mt-2">
                        <p class=" text-xl">Going to <strong>{{ location.destination.name }}</strong></p>
                    </div>
                </div>

                <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <button type="submit" class="inline-flex justify-center items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-black hover:bg-gray-700 focus:outline-none focus:border-gray-700 focus:ring focus:ring-gray-300 focus:ring-opacity-50 transition ease-in-out duration-150">
                        Let's Go
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>

<script setup>
    import { useLocationStore } from '@/stores/location';
import { ref, onMounted } from 'vue';
    import { useRouter } from 'vue-router';

    const location = useLocationStore();
    const router = useRouter()

    const gMap = ref(null)

    onMounted( async () => {
        // does the user a location set ? 
        if(location.destination.name == ''){
            router.push({
                name:'location'
            })
        }

        // lets get the user's current location 
       await location.updateCurrentLocation()

       // draw path in gmap 
       gMap.value.$mapPromise.then((mapObject) => {

        let currentPoint = new google.maps.LatLng(location.current.geometry),
            destinationPoint = new google.maps.LatLng(location.destination.geometry),
            directionsService = new google.maps.DirectionsService,
            directionsDisplay = new google.maps.DirectionsRenderer({
                map : mapObject
            })

            directionsService.route({
                origin : currentPoint,
                destination : destinationPoint,
                avoidTolls : false,
                avoidHighways : false,
                travelMode : google.maps.TravelMode.DRIVING,
            }, (res, status) => {
                if(status === google.maps.DirectionsStatus.OK){
                    directionsDisplay.setDirections(res)
                } else{
                    console.error(status);
                }
            })
       })

    })
</script>