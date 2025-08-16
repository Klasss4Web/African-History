export async function registerPeriodicSync() {
  const registration = await navigator.serviceWorker.ready;

  // Check if supported
  if ("periodicSync" in registration) {
    try {
      // Ask for permission
      const status = await (navigator as any).permissions.query({
        name: "periodic-background-sync" as any,
      });

      if (status.state === "granted") {
        await (registration as any).periodicSync.register(
          "african-history-daily",
          {
            minInterval: 24 * 60 * 60 * 1000, // 1 day
          }
        );
        console.log("✅ Periodic sync registered");
      } else {
        console.warn("❌ Periodic background sync not granted");
      }
    } catch (err) {
      console.error("Periodic sync registration failed:", err);
    }
  }
}
