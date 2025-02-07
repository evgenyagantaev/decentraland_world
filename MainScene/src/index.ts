import { engine, executeTask } from '@dcl/sdk/ecs'
import { TimeManager } from './TimeManager'

export function main() {
  // Accumulator for elapsed seconds
  let elapsed = 0
  const timeManager = new TimeManager()

  engine.addSystem((dt: number) => {
    elapsed += dt
    if (elapsed >= 60) {
      elapsed -= 60
      // Execute the task to process world time
      executeTask(async () => {
        await timeManager.processWorldTime()
      })
    }
  })
}
