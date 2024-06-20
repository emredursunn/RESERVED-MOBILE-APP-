import axios from "axios";
import { PlaceCardProps } from "../components/PlaceCard";
import { DetailedPlace } from "../screens/CustomerScreens/DetailedPlace";


//export const BASE_URL = "http://192.168.1.135/mobile_reservation_backend"
//export const BASE_URL = "http://192.168.1.34/mobile_reservation_backend"
export const BASE_URL = "http://reservation.mava.systems"


interface DataItem {
    id: number;
    name: string;
    created_at?: Date | null;
    deleted_at?: Date | null;
    updated_at?: Date | null;
}

export type Category = {
    key: number,
    value: string
}

export const categoryPhotos = ["https://cdn4.vectorstock.com/i/1000x1000/80/53/disco-dancing-people-vector-18808053.jpg",
    "https://www.tastingtable.com/img/gallery/most-luxurious-expensive-airline-meals/image-import.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ44oCqe83N68WUnCBXvKbR-hqCv-kBF4Vq_A&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTcFDCRNfqSTyb2ia-W7KAGKlMySVEc-T5Qw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKeUCSmnpmoYp5MtECZA2NdX3MYAHTnTnCoQ&s",
    "https://www.tastingtable.com/img/gallery/most-luxurious-expensive-airline-meals/image-import.jpg"
]


export const getMenuCategories = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/api/restaurant/product-type`)
        const data: DataItem[] = response.data.data
        return data.map(item => ({
            key: item.id - 1,
            value: item.name
        }));
    } catch (error) {
        console.log(error)
    }
}


export const getPlaceCategories = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/api/restaurant/category`)
        const data = response.data.data
        const categories: Category[] = data.map((category: any) => ({
            key: category.id,
            value: category.name
        }));
        return categories;
    } catch (error) {
        console.log(error)
        return null;
    }
}


export const formatImageUrl = (imagePath: string | null) => {
    if (BASE_URL.toString() === "http://reservation.mava.systems".toString()) {
        return imagePath ? `${BASE_URL}/storage/${imagePath}` : null;
    } else {
        return imagePath ? `${BASE_URL}/storage/app/public/${imagePath}` : null;
    }
};

export const getAllPlaces = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/api/restaurant/list`)
        const data = response.data.data
        const placeList: PlaceCardProps[] = data.map((place: any) => {
            return {
                id: place.id,
                categoryId: place.category_id,
                name: place.name,
                star_count: place.reviews_count > 0 ? Math.floor(place.star_count_total / place.reviews_count) : 0,
                image_cover: place.image_cover,
                address: place.address
            } as PlaceCardProps
        })
        return categorizePlaces(placeList)
    } catch (error) {
        console.log("getall",error)
        throw error
    }
}

export const categorizePlaces = (places: PlaceCardProps[]) => {
    const allPlaces: PlaceCardProps[][] = [[], [], [], []]
    places.forEach((place) => {
        const category = place.categoryId;
        allPlaces[category - 1].push(place);
    });
    return allPlaces;
};


export const getRestaurantDetails = async ({ restaurantId }: { restaurantId: number }): Promise<DetailedPlace> => {
    try {
        const response = await axios.get(`${BASE_URL}/api/restaurant/${restaurantId}`)
        const detailedRestarant = response.data.data
        return {
            id: detailedRestarant.id,
            name: detailedRestarant.name,
            address: detailedRestarant.address,
            image: detailedRestarant.image[0] ? [
                formatImageUrl(detailedRestarant.image[0].image_cover),
                formatImageUrl(detailedRestarant.image[0].image1),
                formatImageUrl(detailedRestarant.image[0].image2),
                formatImageUrl(detailedRestarant.image[0].image3),
                formatImageUrl(detailedRestarant.image[0].image4)
            ] : ["https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png", null, null, null, null],
            reviews: detailedRestarant.reviews
        }
    } catch (error) {
        console.log("detaild", error)
        throw error
    } {

    }
}


export const statusList = [
    {
        "id": 1,
        "name": "Pending",
        "color": 'yellow'
    },
    {
        "id": 2,
        "name": "Approved",
        "color": 'green'
    },
    {
        "id": 3,
        "name": "Canceled",
        "color": 'red'
    },
    {
        "id": 4,
        "name": "Expired",
        "color": 'gray'
    },
    {
        "id": 5,
        "name": "Completed",
        "color": 'green'
    }
]