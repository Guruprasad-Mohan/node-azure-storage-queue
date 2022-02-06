const { QueueServiceClient } = require("@azure/storage-queue");

// Get connection string (for the associated storage account)
const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;

if (!connectionString) {
  throw new Error(
    "Environment variable AZURE_STORAGE_CONNECTION_STRING must be set."
  );
} else {
  console.log(`Connection String for the Storage queue - ${connectionString}`);
}

// Get the storage queue name from the console.
console.log("Set the storage queue name as an environment variable. Ensure that the storage queue already exists.")
const storageQueueName = process.env.AZURE_STORAGE_QUEUE_NAME;
if (!storageQueueName) {
  throw new Error(
    "Environment variable AZURE_STORAGE_QUEUE_NAME must be set."
  );
} else {
  console.log(`Storage Queue Name - ${storageQueueName}`);
}
// Get the queueClient for the queue
const queueServiceClient = QueueServiceClient.fromConnectionString(connectionString);
const queueClient = queueServiceClient.getQueueClient(storageQueueName);

// Introduce a delay.
const delay = async (ms) => {
  return new Promise(res => setTimeout(res, ms));
}

// Process the message from the queue.
// and then delete it.
const processMessage = async (message) => {
  console.dir(message);
  queueClient.deleteMessage(message.messageId, message.popReceipt);
}

// This is our main function for this program
const main = async () => {
  const receivedMessages = await queueClient.receiveMessages();
  receivedMessages.receivedMessageItems.forEach(processMessage);
  await delay(5000);
  await main();
}

main();
