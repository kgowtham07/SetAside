//function listenForClicks() {
    document.addEventListener("click", (e) => {
  
      
      /**
       * Insert the page-hiding CSS into the active tab,
       * then get the beast URL and
       * send a "beastify" message to the content script in the active tab.
       */
      function getTabs(tabs) {
        console.log(tabs.workset);
        var obj = JSON.parse(tabs.workset);
        
        var i = 0;
        for (i in obj.s_tab) {
          console.log(obj.s_tab[i]);
          var creating = browser.tabs.create({url:`${obj.s_tab[i]}`});
        creating.then(setItem, reportError);
      } 

        // for (let tab of tabs) {
        //     // tab.url requires the `tabs` permission
        //     console.log(tab.url);
        //   }
        browser.storage.local.clear();
      }

      function setAside(tabs){

        var dt = new Date();
        var timeStamp = dt.toUTCString();

        var workset = {name : `${timeStamp}` , s_tab : []};
        workset = JSON.stringify(workset);

        var i = 0;
        var obj = JSON.parse(workset);
       
        var creating = browser.tabs.create({});
        creating.then(setItem, reportError);
       
        for (let tab of tabs){
          obj['s_tab'].push(tab.url);
          console.log(tab.id)
       
          var removing = browser.tabs.remove(tab.id);
          removing.then(setItem, reportError);
       
        }

        workset = JSON.stringify(obj);
        console.log(`Message going to be saved: ${workset}`);

        browser.storage.local.set({workset})
          .then(setItem, reportError);
      }

      function setItem() {
        console.log("OK");
      }


       /**
       * Just log the error to the console.
       */
      function reportError(error) {
        console.error(`Could not statisfy: ${error}`);
      }
  
      /**
       * Get the active tab,
       * then call "beastify()" or "reset()" as appropriate.
       */
      if (e.target.classList.contains("getTabs")) {
        browser.storage.local.get("workset")
          .then(getTabs)
          .catch(reportError);
      }
      if (e.target.classList.contains("setAside")) {
        browser.tabs.query({currentWindow: true})
          .then(setAside)
          .catch(reportError);
      }
    });
  //}



// function logTabs(tabs) {
//     for (let tab of tabs) {
//       // tab.url requires the `tabs` permission
//       console.log(tab.url);
//     }
//   }
  
// function onError(error) {
//     console.log(`Error: ${error}`);
// }
//   console.log("test1");
//   var querying = browser.tabs.query({currentWindow: true});
//   querying.then(logTabs, onError);