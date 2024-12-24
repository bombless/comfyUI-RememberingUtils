import { app } from "../../scripts/app.js";
import { api } from "../../scripts/api.js";

const propertiesMapping = {};
const nodes = [];

function drawTextWithLineBreaks(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' '); // 将文本按空格分割为单词
  let line = ''; // 当前行的文本
  let currentY = y; // 当前行的Y坐标

  words.forEach(word => {
    const testLine = line + (line ? ' ' : '') + word; // 尝试添加单词到当前行
    const metrics = ctx.measureText(testLine); // 测量当前行宽度
    //console.log('metrics.width', metrics.width, 'maxWidth', maxWidth);
    if (metrics.width > maxWidth && line !== '') {
      // 如果当前行宽度超过了最大宽度且行不为空，则绘制当前行
      ctx.fillText(line, x, currentY);
      line = word; // 将当前单词移到下一行
      currentY += lineHeight; // 更新Y坐标
    } else {
      // 否则，将单词添加到当前行
      line = testLine;
    }
  });

  // 绘制最后一行
  if (line) {
    ctx.fillText(line, x, currentY);
  }
}

app.registerExtension({
  name: "RememberingUtils",
  async beforeRegisterNodeDef(nodeType, nodeData, app) {
    if (nodeData.python_module !== "custom_nodes.comfyUI-RememberingUtils") return;
    nodeType.prototype.onDrawForeground = function(ctx, graphcanvas) {
      //console.log(arguments)
      if (this.flags.collapsed) return;
      if (!this.properties.curr) return;
      ctx.save();
      ctx.font = "16px serif";
      if (typeof this.properties.curr === 'string') {
        drawTextWithLineBreaks(ctx, this.properties.curr, 10, 35, this.size[0] - 20, 16);
      } else {
        ctx.fillText(this.properties.curr, 10, 50);
      }
      ctx.restore();
    }
    nodeType.prototype.onAdded = function() {
      // handle the situation when node is freshly added
      //console.log('onAdded', 'id', this.id, 'type', this.type);
      const {id, properties} = this;
      propertiesMapping[id] = properties;
    };
    api.addEventListener('RememberingUtils:change', function(data) {
      //console.log('RememberingUtils:change', data.detail)
      const id = data.detail.node;
      if (!(id in propertiesMapping)) {
        return;
      }
      const properties = propertiesMapping[id];
      properties.next = data.detail.next;
      // console.log('next', properties.next);
    });
    api.addEventListener('progress', function({detail}) {
      //console.log('progress', detail);
      if (detail.value < detail.max) return;
      Object.values(propertiesMapping).forEach(v => {
        //console.log('from', v.curr, 'to', v.next);
        v.curr = v.next;
      });
      // console.log('propertiesMapping', propertiesMapping);
    });
  },
  async nodeCreated(node) {
    nodes.push(node);
  },
  async setup() {
    nodes.forEach(node => {
      const {id, properties, type} = node;
      if (!['ShowLastText', 'ShowLastSeed', 'RememberLastSeed'].includes(type)) return;
      propertiesMapping[id] = properties;
    });
  },
});
