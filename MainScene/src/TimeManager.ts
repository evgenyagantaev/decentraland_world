import { getWorldTime } from '~system/Runtime';
import { executeTask } from '@dcl/sdk/ecs';

export class TimeManager {
  // Method to fetch and process world time details
  public async processWorldTime() {
    // Fetch world time from Decentraland
    const time = await getWorldTime({});
    console.log("Decentraland seconds since the start of the day:", time.seconds);

    // Calculate hours, minutes, and seconds based on world time
    const hours = Math.floor(time.seconds / 3600);
    const minutes = Math.floor((time.seconds % 3600) / 60);
    const seconds = Math.floor(time.seconds % 60);
    console.log(`Decentraland time: ${hours}h ${minutes}m ${seconds}s`);

    // Get the current real world date
    const realDate = new Date(Date.now());
    console.log("Current real date:", realDate.toString());

    // Combine the real date with world time
    const combinedDate = new Date(realDate);
    combinedDate.setHours(hours, minutes, seconds);
    console.log("Combined in-world date and time:", combinedDate.toString());
  }
} 