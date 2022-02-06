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

// Get the queueClient for the queue.
// Use the await queueClient.create(); in case, the storage queue needs to be created newly.
const queueServiceClient = QueueServiceClient.fromConnectionString(connectionString);
const queueClient = queueServiceClient.getQueueClient(storageQueueName);

// This function inserts a hard coded string message into the queue
const insertMessageIntoQueue = async (message) => {
  try {
    await queueClient.sendMessage(message);
    console.log(`${message} inserted...`);
  } catch (err) {
    console.error(err);
  }
};

// Introduce a delay between message inserts.
const delay = async (ms) => {
  return new Promise((res) => setTimeout(res, ms));
};

// Entry point of the program.
let messageNumber = 1;
const main = async () => {
  await insertMessageIntoQueue(` ${messageNumber}`);
  messageNumber++;
  await delay(5000); // Msgs are inserted after a 5 sec delay.
  await main();
};

main();
