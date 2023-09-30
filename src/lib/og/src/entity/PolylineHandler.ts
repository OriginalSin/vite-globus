import * as shaders from '../shaders/polyline';
import {EntityCollection} from "./EntityCollection";
import {Polyline} from "./Polyline";
import {Renderer} from "../renderer/Renderer";
import {RenderNode} from "../scene/RenderNode";

class PolylineHandler {
    static __counter__: number = 0;
    protected __id: number;
    public _entityCollection: EntityCollection;
    public pickingEnabled: boolean;
    protected _renderer: Renderer | null;
    protected _polylines: Polyline[];

    constructor(entityCollection: EntityCollection) {

        this.__id = PolylineHandler.__counter__++;

        this._entityCollection = entityCollection;

        this._renderer = null;

        this._polylines = [];

        this.pickingEnabled = true;
    }

    protected _initProgram() {
        if (this._renderer && this._renderer.handler) {
            if (!this._renderer.handler.programs.polyline_screen) {
                this._renderer.handler.addProgram(shaders.polyline_screen());
            }
            if (!this._renderer.handler.programs.polyline_picking) {
                this._renderer.handler.addProgram(shaders.polyline_picking());
            }
        }
    }

    public setRenderNode(renderNode: RenderNode) {
        this._renderer = renderNode.renderer;
        this._initProgram();
        for (let i = 0; i < this._polylines.length; i++) {
            this._polylines[i].setRenderNode(renderNode);
        }
    }

    public add(polyline: Polyline) {
        if (polyline._handlerIndex === -1) {
            polyline._handler = this;
            polyline._handlerIndex = this._polylines.length;
            this._polylines.push(polyline);
            this._entityCollection && this._entityCollection.renderNode &&
            polyline.setRenderNode(this._entityCollection.renderNode);
        }
    }

    public remove(polyline: Polyline) {
        let index = polyline._handlerIndex;
        if (index !== -1) {
            polyline._deleteBuffers();
            polyline._handlerIndex = -1;
            polyline._handler = null;
            this._polylines.splice(index, 1);
            this.reindexPolylineArray(index);
        }
    }

    public reindexPolylineArray(startIndex: number) {
        let ls = this._polylines;
        for (let i = startIndex; i < ls.length; i++) {
            ls[i]._handlerIndex = i;
        }
    }

    public draw() {
        let i = this._polylines.length;
        while (i--) {
            this._polylines[i].draw();
        }
    }

    public drawPicking() {
        if (this.pickingEnabled) {
            let i = this._polylines.length;
            while (i--) {
                this._polylines[i].drawPicking();
            }
        }
    }

    public clear() {
        let i = this._polylines.length;
        while (i--) {
            this._polylines[i]._deleteBuffers();
            this._polylines[i]._handler = null;
            this._polylines[i]._handlerIndex = -1;
        }
        this._polylines.length = 0;
        this._polylines = [];
    }
}

export {PolylineHandler};