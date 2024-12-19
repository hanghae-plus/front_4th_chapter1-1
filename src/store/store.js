// const Store = () => {
//   const observers = [];
//
//   return {
//     subscribe: (observer) => {
//       observers.push(observer);
//     },
//     unsubscribe: (observer) => {
//       const index = observers.indexOf(observer);
//       if (index > -1) {
//         observers.splice(index, 1);
//       }
//     },
//     notify: (data) => {
//       observers.forEach((observer) => observer(data));
//     },
//   };
// };
