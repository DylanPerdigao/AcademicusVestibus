"use strict";

class SnakeFillMenus{
    constructor(ctx, cell, img1, img2, img3, img4) {
        this.imgs = [];
        this.init(ctx, cell, img1, img2, img3, img4);
    }

    init(ctx ,cell, img1, img2, img3, img4){ 
        // 1 button
        this.imgs.push(new SpriteImage(3*cell, 3*cell, 10*cell, 10*cell, img1));
        this.imgs[0].draw(ctx);
        
        // 2 button
        this.imgs.push(new SpriteImage(17*cell, 3*cell, 10*cell, 10*cell, img2));
        this.imgs[1].draw(ctx);
        
        // 3 button
        this.imgs.push(new SpriteImage(3*cell, 17*cell, 10*cell, 10*cell, img3));
        this.imgs[2].draw(ctx);
        
        // 4 button
        this.imgs.push(new SpriteImage(17*cell, 17*cell, 10*cell, 10*cell, img4));
        this.imgs[3].draw(ctx);
    }

}

