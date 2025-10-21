import { useState } from 'react';
import { getItinerary } from './api/planner';
import TripDetails from './components/TripDetails';
import { Container, Card, Typography, TextField, Slider, ToggleButtonGroup, ToggleButton, Button, CircularProgress, Stack, Box } from '@mui/material';
interface PlannerResponse {
  itinerary?: string;
  weather?: string;
  activities?: string;
  packing_list?: string[];
  food?: string;
  links?: string[];
  error?: string;
}

function App() {
  const [destination, setDestination] = useState<string>('');
  const [days, setDays] = useState<number>(3);
  const [preferences, setPreferences] = useState<string[]>([]);
  const [result, setResult] = useState<PlannerResponse | null>(null);

// 1. New State for Loading
  const [isLoading, setIsLoading] = useState<boolean>(false); 

  const handleSubmit = async () => {
    // Basic validation to prevent empty submissions
    if (!destination.trim()) {
        setResult({ error: "Please enter a destination." });
        return;
    }
    
    // 2. Set loading to true when starting the request
    setIsLoading(true);
    setResult(null); // Clear previous results

    try {
        const data = await getItinerary(destination, days, preferences);
        setResult(data);
    } catch (e) {
        console.error("Itinerary generation failed:", e);
        setResult({ error: "An unexpected error occurred while generating the plan." });
    } finally {
        // 3. Set loading back to false when the request is complete
        setIsLoading(false); 
    }
  };

return (
        <Container maxWidth="md" sx={{ mt: 5 }}>
            <Typography variant="h3" component="h1" gutterBottom align="center" fontWeight="bold">
                🌍 AI Travel Planner
            </Typography>

            <Card sx={{ p: 4, boxShadow: 6 }}>
                <Typography variant="h5" mb={3}>Plan Your Trip</Typography>
                <Stack spacing={3}>
                    {/* Destination Input */}
                    <TextField
                        label="Destination City/Country"
                        variant="outlined"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        placeholder="e.g., Singapore"
                        fullWidth
                    />

                    {/* Duration Slider */}
                    <Box>
                        <Typography gutterBottom>Trip Duration: {days} days</Typography>
                        <Slider
                            value={days}
                            onChange={(_, newValue) => setDays(newValue as number)}
                            min={1}
                            max={14}
                            valueLabelDisplay="auto"
                            marks={[{ value: 1, label: '1' }, { value: 14, label: '14' }]}
                        />
                    </Box>

                    {/* Preferences Toggle Group (Better than multi-select) */}
                    <Box>
                        <Typography gutterBottom>Travel Preferences</Typography>
                        <ToggleButtonGroup
                            value={preferences}
                            onChange={(_, newPreferences) => setPreferences(newPreferences)}
                            aria-label="travel preferences"
                            fullWidth
                        >
                            {['Food', 'Nature', 'Museums', 'Shopping'].map((pref) => (
                                <ToggleButton key={pref} value={pref} aria-label={pref}>
                                    {pref}
                                </ToggleButton>
                            ))}
                        </ToggleButtonGroup>
                    </Box>

                    {/* Submit Button with Loading State */}
<Button
    variant="contained"
    color="primary"
    size="large"
    onClick={handleSubmit}
    // 1. Disable the button while loading
    disabled={isLoading} 
    
    // 2. Conditionally show the text/spinner
    startIcon={
        // Only display the text when NOT loading
        !isLoading && <CircularProgress />  
    }
    sx={{ mt: 2 }}
>
    {isLoading ? (
        // 3. Show the spinner inside the button, and make it small
        <CircularProgress size={24} color="inherit" />
    ) : (
        // 4. Show the standard text when not loading
        'Generate Itinerary'
    )}
</Button>
                </Stack>
            </Card>

            {/* Display Results */}
            {/* ... Error message handling */}
            {result && !result.error && <TripDetails data={result} />}
        </Container>
    );

}

export default App;