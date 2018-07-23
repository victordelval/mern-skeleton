export default () => {
  return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>MERN App</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500">
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
        <style>
          a {
            text-decoration: none
          }
        </style>
      </head>
      <body>
        <div id="root"></div>
        <script type="text/javascript" src="/dist/bundle.js"></script>
        </body>
    </html>`
}
