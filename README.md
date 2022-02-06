# node-azure-storage-queue
Source code to demonstrate the Azure Queue Storage library to interact with a storage queue using node JS.

## steps to run the code
   - The source code contains a producer and consumer of the messages codes in node JS.
   - The producer adds messages to the storage queue at a rate of one message per 5 seconds.
   - The message is a simple string but this can also be a JSON object or XML.
   - The consumer reads the message from the queue and deletes them.
   - The messages are input to the console window.

## pre-requisites
   - To run the source code, you need Node installed in your machine.
   
   - You need a text editor to view/modify the code preferably Visual Studio Code but any text editor will do.

   - In case, you wish to run the code and check the execution, you will need an Azure Subscription.
     A 30 day free trial is available at - https://azure.microsoft.com/en-in/free/

   - You need to create a storage account and queue within it which needs to be set as environment variables when you run the code.
     The storage queue can be created with the steps here - https://docs.microsoft.com/en-us/azure/storage/queues/storage-quickstart-queues-portal

   - In Windows OS - the environment variable can be set in PowerShell as below - 
     `$env:AZURE_STORAGE_CONNECTION_STRING="<Add the storage queue connection string here>"`
   - In the Bash shell - the environment variables can be set as below
     `export AZURE_STORAGE_CONNECTION_STRING="<Add the storage queue connection string here>"`
