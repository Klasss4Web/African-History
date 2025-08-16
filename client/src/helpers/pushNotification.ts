export async function subscribeToPush(): Promise<void> {
  if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
    console.warn("Push messaging is not supported in this browser.");
    return;
  }

  const registration: ServiceWorkerRegistration = await navigator.serviceWorker
    .ready;

  // Your public VAPID key
  const vapidPublicKey: string = "YOUR_VAPID_PUBLIC_KEY";
  const convertedKey: Uint8Array = urlBase64ToUint8Array(vapidPublicKey);

  try {
    const subscription: PushSubscription =
      await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: convertedKey as BufferSource,
      });

    // Send subscription to backend
    await fetch("/api/save-subscription", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(subscription),
    });

    console.log("Push subscription successful:", subscription);
  } catch (error) {
    console.error("Push subscription failed:", error);
  }
}

// urlBase64ToUint8Array function remains unchanged and is correctly typed.
function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding: string = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64: string = (base64String + padding)
    .replace(/-/g, "+")
    .replace(/_/g, "/");

  const rawData: string = window.atob(base64);
  const outputArray: Uint8Array = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
}
