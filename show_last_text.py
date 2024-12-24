from server import PromptServer

class ShowLastText:
    last_text = None
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "hidden": {"node_id": "UNIQUE_ID"},
            "required": {
                "text": ("STRING", {}),
            }
        }

    OUTPUT_NODE = True
    RETURN_TYPES = ("STRING",)
    FUNCTION = "read_text"
    CATEGORY = "utils"

    def read_text(self, text, node_id):
        PromptServer.instance.send_sync("RememberingUtils:change", {"node": node_id, "next": text})

        return (text,)

