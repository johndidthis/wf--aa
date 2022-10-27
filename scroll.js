function inView( opt ) {
			if( opt.selector === undefined ) {
				console.log( 'Valid selector required for inView' );
				return false;
			}
			var elems = [].slice.call( document.querySelectorAll( opt.selector ) ),
				once = opt.once === undefined ? true : opt.once,
				offsetTop = opt.offsetTop === undefined ? 0 : opt.offsetTop,
				offsetBot = opt.offsetBot === undefined ? 0 : opt.offsetBot,
				count = elems.length,
				winHeight = 0,
				ticking = false;
			function update() {
				var i = count;
				while( i-- ) {
					var elem = elems[ i ],
						rect = elem.getBoundingClientRect();
					if( rect.bottom >= offsetTop && rect.top <= winHeight - offsetBot ) {
						elem.classList.add( 'inview' );
						if( once ) {
							count--;
							elems.splice( i, 1 );
						}
					} else {
						elem.classList.remove( 'inview' );
					}
				}
				ticking = false;
			}
			function onResize() {
				winHeight = window.innerHeight;
				requestTick();
			}
			function onScroll() {
				requestTick();
			}
			function requestTick() {
				if( !ticking ) {
					requestAnimationFrame( update );
					ticking = true;
				}
			}
			window.addEventListener( 'resize', onResize, false );
			document.addEventListener( 'scroll', onScroll, false );
			document.addEventListener( 'touchmove', onScroll, false );
			onResize();
		}
		inView({
			selector: '.viewme', // an .inview class will get toggled on these elements
			once: false, // set this to false to have the .inview class be toggled on AND off
			offsetTop: 180, // top threshold to be considered "in view"
			offsetBot: 100 // bottom threshold to be considered "in view"
		});
