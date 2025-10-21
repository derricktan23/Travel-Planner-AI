interface TripDetailsProps {
  data: {
    itinerary?: string;
    weather?: string;
    activities?: string;
    packing_list?: string[];
    food?: string;
    links?: string[];
  };
}

function TripDetails({ data }: TripDetailsProps) {
  return (
    <div style={{ marginTop: '2rem' }}>
      {data.itinerary && (
        <section>
          <h2>🗺️ Itinerary</h2>
          <p>{data.itinerary}</p>
        </section>
      )}

      {data.weather && (
        <section>
          <h2>🌤️ Weather Forecast</h2>
          <p>{data.weather}</p>
        </section>
      )}

      {data.activities && (
        <section>
          <h2>🎡 Recommended Activities</h2>
          <p>{data.activities}</p>
        </section>
      )}

      {Array.isArray(data.packing_list) && data.packing_list.length > 0 && (
        <section>
          <h2>🎒 Packing List</h2>
          <ul>
            {data.packing_list.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      {data.food && (
        <section>
          <h2>🍜 Local Food Highlights</h2>
          <p>{data.food}</p>
        </section>
      )}

      {Array.isArray(data.links) && data.links.length > 0 && (
        <section>
          <h2>🔗 Useful Links</h2>
          <ul>
            {data.links.map((link, i) => (
              <li key={i}>
                <a href={link} target="_blank" rel="noopener noreferrer">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

export default TripDetails;