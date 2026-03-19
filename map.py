import folium

# Create map centered on your location
map = folium.Map(
    location=[54.378543863879635, -2.9065387027298857],  # Windermere coordinates
    zoom_start=15,
    tiles='CartoDB positron'  # Light, clean style
)

# Add a custom marker with your lavender color
folium.Marker(
    location=[54.378543863879635, -2.9065387027298857],
    popup='<b>Reign Wellness Store</b><br>44 Main Road, Windermere',
    tooltip='Reign Wellness Store',
    icon=folium.Icon(color='purple', icon='heart', prefix='fa')
).add_to(map)

# Save as HTML
map.save('map.html')