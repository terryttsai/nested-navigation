# nested-navigation
Example app that implements nested stack navigators from react-navigation

We nest 3 StackNavigators like this: Root -> Main -> EndRide

We pass in the Main navigation prop into the EndRide stack navigator as parentNavigation

Then screens inside the EndRide stack navigator can call on the parent navigator, allowing us to leave the EndRide stack and back to the Main stack.

We also make sure to reset navigation to the End Ride Receipt so that pressing back from the Receipt goes back to Main. Currently the animation goes the wrong way with this approach..
