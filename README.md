# ongaku suki desu
"ongaku suki desu" is a experimental music payment project for [Colony Hackathon](https://github.com/JoinColony/colonyHackathon). We aim to reward all the creative musicians fairly and automatically with the power of distributed ledger. T

## Development
From root directory of the project run npm install.
To start a development server run gulp from the command line.
This opens a new browser window that reloads every time you make and save changes to project files.

### Working with CSS
The project uses [Sass CSS preprocessor](https://sass-lang.com/). All the styles are imported and controlled from the `app.scss`.


### Working with JavaScript

The project relies on manually downloading and managing JS libraries and custom scripts.

To add a new library list a path to the library in `js_lib_src` array in `gulpfile.js`.

JS files in `assets_src/js/components/` are automatically concatenated in **alphabetical order** (you can use number prefix to control the order). Files in here should be entirely self-contained or only be comprised of functions that later get called from `app.js`.



Please note that the order matters, so make sure you list any dependencies before files that require them.


## contributer
- Soma Suzuki [[web](https://soma11soma11.github.io/)] [[twitter](https://twitter.com/11_soma_)]
- Kazuyuki Morishita


