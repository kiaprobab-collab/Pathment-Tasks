export interface Place {
  id: number;
  imgLink: string;
  title: string;
  location: string;
  country: string;
  price: number;
  reviewsNumbers: number;
  rating: number;
  days: string;
  bestTimeToVisit: string;
  description: string;
}

export const places: Place[] = [
  {
    id: 1,
    imgLink:
      "https://lh3.googleusercontent.com/gps-cs-s/APNQkAFeCNixKtkgdi5OdpebHZSYBlzpoGt6brwpkOxs5KfusDyY43STJ5R0Un_fjNlE2OhqcaS_wytanaMS3SiHYEWJu01coIDUmRXEhu4MG4NSK1yy4CzP5r54l1yiFRcNdSqh6FRJ=s1360-w1360-h1020-rw",
    title: "Taj Mahal",
    location: "Agra, India",
    country: "India",
    price: 99999,
    reviewsNumbers: 100,
    rating: 4.8,
    days: "2 Days",
    bestTimeToVisit: "October - March",
    description:
      "The Taj Mahal is a magnificent white marble mausoleum built by Emperor Shah Jahan in memory of his wife Mumtaz Mahal.",
  },
  {
    id: 2,
    imgLink:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqvSD7A6RBdAq-yDvFfpkHa6fJdrc6bRCecKCDQncswQyN1233plLfrQ&s=10",
    title: "Eiffel Tower",
    location: "Paris, France",
    country: "France",
    price: 84999,
    reviewsNumbers: 245,
    rating: 4.7,
    days: "3 Days",
    bestTimeToVisit: "April - June",
    description:
      "The Eiffel Tower is the most iconic landmark in Paris and offers breathtaking views of the city.",
  },
  {
    id: 3,
    imgLink:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5dPKwTim_GL-AzjTES6oKXDhQOOeUxllCaEV_0BJ3b33KmU5q0YQVAAk&s=10",
    title: "Burj Khalifa",
    location: "Dubai, UAE",
    country: "UAE",
    price: 119999,
    reviewsNumbers: 321,
    rating: 4.9,
    days: "4 Days",
    bestTimeToVisit: "November - February",
    description:
      "The Burj Khalifa is the tallest building in the world and the centerpiece of Dubai's skyline.",
  },
  {
    id: 4,
    imgLink:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8gEBkEITk0kSHPergwlVMzLmzUmTnT4o0pMBm8ojMCQ&s=10",
    title: "Colosseum",
    location: "Rome, Italy",
    country: "Italy",
    price: 69999,
    reviewsNumbers: 178,
    rating: 4.6,
    days: "3 Days",
    bestTimeToVisit: "April - October",
    description:
      "The Colosseum is an ancient Roman amphitheater that once hosted gladiator contests and public spectacles.",
  },
  {
    id: 5,
    imgLink:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLtpgGKxUG9qYUI4N5ei6KFK2j-WTcJbxCBx-zigovBJF-AJSB9eDLGz3e&s=10",
    title: "Great Wall",
    location: "Beijing, China",
    country: "China",
    price: 89999,
    reviewsNumbers: 412,
    rating: 4.8,
    days: "5 Days",
    bestTimeToVisit: "September - November",
    description:
      "The Great Wall of China is one of the greatest architectural achievements in human history.",
  },
  {
    id: 6,
    imgLink:
      "https://media.cntraveller.com/photos/611be9bb69410e829d87e0c2/1:1/w_1280,h_1280,c_limit/Blue-domed-church-along-caldera-edge-in-Oia-Santorini-greece-conde-nast-traveller-11aug17-iStock.jpg",
    title: "Santorini",
    location: "Greece",
    country: "Greece",
    price: 109999,
    reviewsNumbers: 267,
    rating: 4.9,
    days: "5 Days",
    bestTimeToVisit: "May - September",
    description:
      "Santorini is famous for its whitewashed houses, blue-domed churches, and spectacular sunsets.",
  },
  {
    id: 7,
    imgLink:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY9Ow2ZV5bnCgrhhygENffGHd4xNwQEWaIt7PYxWlAT-fNlrykzv5YqFk&s=10",
    title: "Statue of Liberty",
    location: "New York, USA",
    country: "United States",
    price: 79999,
    reviewsNumbers: 198,
    rating: 4.7,
    days: "2 Days",
    bestTimeToVisit: "April - June",
    description:
      "The Statue of Liberty is a symbol of freedom and one of the most recognizable monuments in the world.",
  },
  {
    id: 8,
    imgLink:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCzIPR5i2NPhPmNA4C8xRqL1SH0akmlOUd7ijkHm5jWnGHqYkYn4Y32Aw&s=10",
    title: "Sydney Opera House",
    location: "Sydney, Australia",
    country: "Australia",
    price: 94999,
    reviewsNumbers: 156,
    rating: 4.8,
    days: "4 Days",
    bestTimeToVisit: "September - November",
    description:
      "The Sydney Opera House is an architectural masterpiece and one of Australia's most famous landmarks.",
  },
];
