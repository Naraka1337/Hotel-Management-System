from app.core.database import SessionLocal
from app.models.hotel import Hotel

db = SessionLocal()

# New hotels from various countries
new_hotels = [
    # USA
    {"name": "The Manhattan Grand", "location": "New York, USA", "description": "Luxury hotel in the heart of Manhattan with stunning skyline views.", "manager_id": 5, "image_url": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800"},
    {"name": "Beverly Hills Resort", "location": "Los Angeles, USA", "description": "Exclusive resort in the prestigious Beverly Hills area.", "manager_id": 5, "image_url": "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800"},
    
    # France
    {"name": "Paris Lumiere Hotel", "location": "Paris, France", "description": "Elegant hotel near the Eiffel Tower with authentic French charm.", "manager_id": 5, "image_url": "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800"},
    {"name": "Côte d'Azur Palace", "location": "Nice, France", "description": "Beachfront luxury on the French Riviera.", "manager_id": 5, "image_url": "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800"},
    
    # UK
    {"name": "London Royal Inn", "location": "London, UK", "description": "Classic British elegance in central London.", "manager_id": 5, "image_url": "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800"},
    {"name": "Edinburgh Castle View", "location": "Edinburgh, UK", "description": "Historic hotel overlooking Edinburgh Castle.", "manager_id": 5, "image_url": "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?w=800"},
    
    # Japan
    {"name": "Tokyo Imperial Hotel", "location": "Tokyo, Japan", "description": "Modern luxury meets traditional Japanese hospitality.", "manager_id": 5, "image_url": "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800"},
    {"name": "Kyoto Garden Resort", "location": "Kyoto, Japan", "description": "Serene retreat surrounded by traditional Japanese gardens.", "manager_id": 5, "image_url": "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800"},
    
    # UAE
    {"name": "Dubai Marina Suites", "location": "Dubai, UAE", "description": "Ultra-luxury suites with panoramic marina views.", "manager_id": 5, "image_url": "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800"},
    {"name": "Abu Dhabi Grand Palace", "location": "Abu Dhabi, UAE", "description": "Opulent palace hotel with world-class amenities.", "manager_id": 5, "image_url": "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800"},
    
    # Italy
    {"name": "Roma Antica Hotel", "location": "Rome, Italy", "description": "Historic hotel steps from the Colosseum.", "manager_id": 5, "image_url": "https://images.unsplash.com/photo-1455587734955-081b22074882?w=800"},
    {"name": "Venice Grand Canal", "location": "Venice, Italy", "description": "Romantic hotel on the famous Grand Canal.", "manager_id": 5, "image_url": "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800"},
    
    # Spain
    {"name": "Barcelona Beach Resort", "location": "Barcelona, Spain", "description": "Mediterranean paradise on Barceloneta Beach.", "manager_id": 5, "image_url": "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800"},
    {"name": "Madrid Royal Palace Hotel", "location": "Madrid, Spain", "description": "Majestic hotel near the Royal Palace.", "manager_id": 5, "image_url": "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800"},
    
    # Australia
    {"name": "Sydney Harbour View", "location": "Sydney, Australia", "description": "Iconic views of Sydney Opera House and Harbour Bridge.", "manager_id": 5, "image_url": "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800"},
    
    # Thailand
    {"name": "Bangkok Paradise Hotel", "location": "Bangkok, Thailand", "description": "Luxury retreat in the heart of Bangkok.", "manager_id": 5, "image_url": "https://images.unsplash.com/photo-1586611292717-f828b167408c?w=800"},
]

print(f"Adding {len(new_hotels)} new hotels...")

for hotel_data in new_hotels:
    hotel = Hotel(**hotel_data)
    db.add(hotel)

db.commit()
print("Done! Hotels added successfully.")

# Verify
total = db.query(Hotel).count()
print(f"Total hotels now: {total}")

db.close()
