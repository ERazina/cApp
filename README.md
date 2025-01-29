# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


# Application functionality

The app has tha main page. On the main page you can see information on every currency. (ask price, bid price, difference in 24 hours, and rate (medium price)).
If you click on the row - you will go to detail page. On the detail page you can see the information about the currency you have chosen (ask proce, bid price,difference in 24 hours, and rate (medium price)). If you want to go on previous page - you can click "go back button".

This application has mobile view, tablet view and desctop view. In mobile version view you can see only ask price, bid price, difference in 24 hours. This was done to minimize the data you see on the screen.

Also, difference in 24 hours data is shown in green, red and black colour. If the number is green - the currency grows. If red - the currency fall. If black - there is no difference in 24 hours.

# For developers:
For this app I used:
React functional components, hooks (quuick).
React-router (for routing)
MobX to get and store data.
I used cutom styles with media queries to show I can manually style component.
Also I used styled component in GoBackButton because I ea ted to show that I can use styled components as well. But if we have a lot of data - custom styles will be quicker.
I used vite to build project because it's quicker than wepback.
