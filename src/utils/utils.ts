import axios from "axios";
import { CategoryCardProps } from "../components/CategoryCard";
import { PlaceCardProps } from "../components/PlaceCard";
import { useState } from "react";

export const menuCategories = [
    { key: '0', value: 'FOODS' },
    { key: '1', value: 'DRINKS' },
    { key: '2', value: 'ALCOHOLS' },
    { key: '3', value: 'OTHERS' }
]

const BASE_URL = "http://192.168.1.126/mobile_reservation_backend"
type Category = {
    key: number,
    value: string
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


const maison = { id: 0, categoryId: 0, name: "No 62 Pub", stars: 4, cover: "https://gopos.com.tr/wp-content/uploads/2019/11/Bar-açarken-nelere-dikat-etmeli-1.jpg" };
const kumbarahall = { id: 1, categoryId: 0, name: "Kumbara Hall", stars: 3, cover: "https://media-cdn.tripadvisor.com/media/photo-s/19/e8/5e/5f/wave-bar.jpg" };
const restplus = { id: 2, categoryId: 0, name: "Rest Plus", stars: 5, cover: "https://c4.wallpaperflare.com/wallpaper/961/657/229/disco-disco-music-disko-dancing-4k-ultra-hd-wallpaper-for-desktop-laptop-tablet-mobile-phones-and-tv-3840×2400-wallpaper-preview.jpg" };

const efsanepide = { id: 3, categoryId: 1, name: "Efsane Pide", stars: 4, cover: "https://gopos.com.tr/wp-content/uploads/2019/11/Bar-açarken-nelere-dikat-etmeli-1.jpg" };
const kebapciokkes = { id: 4, categoryId: 1, name: "Kebapçı Ökkeş", stars: 4, cover: "https://media-cdn.tripadvisor.com/media/photo-s/19/e8/5e/5f/wave-bar.jpg" };
const kofteciyusuf = { id: 5, categoryId: 1, name: "Köfteci Yusuf", stars: 5, cover: "https://c4.wallpaperflare.com/wallpaper/961/657/229/disco-disco-music-disko-dancing-4k-ultra-hd-wallpaper-for-desktop-laptop-tablet-mobile-phones-and-tv-3840×2400-wallpaper-preview.jpg" };

const kukla = { id: 6, categoryId: 2, name: "Kukla Pub", stars: 3, cover: "https://gopos.com.tr/wp-content/uploads/2019/11/Bar-açarken-nelere-dikat-etmeli-1.jpg" };
const momo: PlaceCardProps = { id: 7, categoryId: 2, name: "Momo by Rest", stars: 2, cover: "https://media-cdn.tripadvisor.com/media/photo-s/19/e8/5e/5f/wave-bar.jpg", reviews: [{ id: 0, userId: 0, comment: "Excellent!!!.", stars: 5, placeId: 7 }, { id: 1, userId: 0, comment: "What a great night!.", stars: 4, placeId: 7 }, { id: 2, userId: 0, comment: "Disgusting...", stars: 1, placeId: 7 }, { id: 3, userId: 0, comment: "Not bad.", stars: 3, placeId: 7 }, { id: 4, userId: 0, comment: "Çok güzel bir geceydi.", stars: 3, placeId: 7 }] };
const hollystone = { id: 8, categoryId: 2, name: "Holly Stone", stars: 3, cover: "https://c4.wallpaperflare.com/wallpaper/961/657/229/disco-disco-music-disko-dancing-4k-ultra-hd-wallpaper-for-desktop-laptop-tablet-mobile-phones-and-tv-3840×2400-wallpaper-preview.jpg" };

const gameline = { id: 9, categoryId: 3, name: "Gameline", stars: 4, cover: "https://gopos.com.tr/wp-content/uploads/2019/11/Bar-açarken-nelere-dikat-etmeli-1.jpg" };
const santra = { id: 10, categoryId: 3, name: "Santra Playstation", stars: 5, cover: "https://media-cdn.tripadvisor.com/media/photo-s/19/e8/5e/5f/wave-bar.jpg", };
const paradise = { id: 11, categoryId: 3, name: "Paradise Okey Salonu", stars: 3, cover: "https://c4.wallpaperflare.com/wallpaper/961/657/229/disco-disco-music-disko-dancing-4k-ultra-hd-wallpaper-for-desktop-laptop-tablet-mobile-phones-and-tv-3840×2400-wallpaper-preview.jpg" };


const bars: PlaceCardProps[] = [maison, kumbarahall, restplus];
const restaurants: PlaceCardProps[] = [efsanepide, kebapciokkes, kofteciyusuf];
const pubs: PlaceCardProps[] = [kukla, momo, hollystone];
const gameSaloons: PlaceCardProps[] = [gameline, santra, paradise];

export const allPlaces = [bars, restaurants, pubs, gameSaloons]

const bar = { id: 0, name: "Bar", cover: "https://c4.wallpaperflare.com/wallpaper/961/657/229/disco-disco-music-disko-dancing-4k-ultra-hd-wallpaper-for-desktop-laptop-tablet-mobile-phones-and-tv-3840×2400-wallpaper-preview.jpg" };
const restaurant = { id: 1, name: "Restaurant", cover: "https://www.turizmaktuel.com/image-upload/news/dunyada-ilk-restoran-nerede-ve-nasil-kuruldu_1427880420.jpg" };
const pub = { id: 2, name: "Pub", cover: "https://www.diyetkolik.com/site_media/media/customvideo_images/glutensiz_bira_nedir___1.jpg" };
const gameSaloon = { id: 3, name: "Game Saloon", cover: "https://trthaberstatic.cdn.wp.trt.com.tr/resimler/1714000/bilardo-aa-1715440.jpg" };

export const categories: CategoryCardProps[] = [bar, restaurant, pub, gameSaloon];


export const tableCategories = [
    { key: '0', value: 'Bahçe' },
    { key: '1', value: 'Salon' },
    { key: '2', value: 'Teras' },
    { key: '3', value: 'Loca' }
]