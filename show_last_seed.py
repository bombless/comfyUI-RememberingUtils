from server import PromptServer

class ShowLastSeed:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "hidden": {"node_id": "UNIQUE_ID"},
            "required": {
                "seed": ("INT", {}),
            }
        }

    OUTPUT_NODE = True
    RETURN_TYPES = ("STRING",)
    FUNCTION = "read_seed"
    CATEGORY = "utils"

    def read_seed(self, seed, node_id):
        PromptServer.instance.send_sync("RememberingUtils:change", {"node": node_id, "next": seed})
        return (str(seed),)

