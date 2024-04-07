<template>
    <div class="pt-16">
        <h1 class="text-3xl font-semibold mb-4">Where are we going?</h1>
        <form>
            <div class="overflow-hidden shadow sm:rounded-md max-w-sm mx-auto text-left">
                <div class="bg-white px-4 py-5 sm:p-6">
                    <div>
                        <GMapAutocomplete placeholder="My Destination"
                            @place_changed="handleLocationChange" name="mobile" id="mobile" 
                            class="appearance-none mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                        </GMapAutocomplete>
                    </div>
                </div>

                <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <button @click.prevent="handleSelectLocation"  type="submit" class="inline-flex justify-center items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-black hover:bg-gray-700 focus:outline-none focus:border-gray-700 focus:ring focus:ring-gray-300 focus:ring-opacity-50 transition ease-in-out duration-150">
                        Find A Ride
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>

<script setup>
import { useLocationStore } from '@/stores/location';
import { useRouter } from 'vue-router';


    const location = useLocationStore();
    const router = useRouter()
    const handleLocationChange = (e) => {
        console.log('ddsds',e);
        location.$patch({
            destination : {
                name : e.name,
                address : e.formatted_address,
                geometry : {
                    lat : e.geometry.location.lat(),
                    lng : e.geometry.location.lng()
                }
            }
        })
    }

    const handleSelectLocation = () => {
        if(location.destination.name !== ''){
            router.push({
                name : 'map'
            })
        }
    }
</script>