David Gallant Interview Test Things To Do:

+ add a favicon.ico to the project.
+ ~~Update dependencies and webpack in client (To show that I know how to use webpack)~~
    + ~~Update dependencies~~
    + ~~Add LESS support to project and webpack~~
    + ~~Add HappyPack support to webpack~~
    + ~~Add SplitChunks plugin to webpack~~
    + ~~Add CleanWebpackPlugin plugin to webpack~~
    + ~~Update babel settings~~
    + ~~Add MiniCssExtractPlugin plugin to webpack~~
    + ~~Add typical file loaders and rules to webpack~~
    + ~~Update module webpack advanced settings~~
+ Update server dependencies
+ Update everything that was effected by the React and webpack update and other deps  
+ Create and setup a unit testing framework
+ Update user database schema to:
    + include cart id items and relevant information
    + user type: "admin" or "customer"
+ Create server APIs:
    + Create user
    + login user
    + validate user
    + add item to cart
    + like item
+ Add jwt command validation to api's
+ Add a user action log schema to the database
+ Add user action logs to all api's
+ Add daily backup of database
+ When not logged in, allow the user to browse but if they attempt to buy or interact with the cart, prompt them to login
+ Create a user session system  
+ Create a header bar
    + Show a login button
        + Create a login dialog
        + Have a login with social media or username/password
        + Have a sign up button
            + Create a sign up dialog
            + allow sign up with social media
            + allow manual sign up
            + require email
            + add email or sms validation
    + Show the logged in user name as button
        + Display a menu with options for
            + User profile
            + Log out
    + Create a user profile page
        + Show user details.
        + allow log out
        + allow delete account
    + Add a cart button showing number of items in the card.
+ Add click event to buy button
    + Show pop up for the client to be able to select quantity?
    + Add quantity input beside buy button?
+ Improve product interface and listing
+ Add a "like" button to the product options for logged in users.
+ Add a label to show the number of likes.
+ Add search filter to product list
+ Add paging/infinite scroll to product listing
+ Add sorting to product list
+ Add page wait system while app is loading
+ Add "Add to Cart" button to go alongside "Buy Now" - think of the way amazon does it.
+ Add option to remove from cart or reduce quantity in cart.
+ Add a Cart page that shows the contents of the users cart and the ability to modify the cart and finalize purchase.
+ If time, create a fake merchant payment system to emulate a successful purchase and return to the store.
+ If time, add rating system with stars
+ If time, create an admin page that will show the user logs.
    + Page should be protected to allow admins only
    + Page should allow the action list to be filtered by user/actions
    + Page should allow a date range
