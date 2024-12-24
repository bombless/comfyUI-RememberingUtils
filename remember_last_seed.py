class RememberLastSeed:
    last_seed = None
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "seed": ("INT", {}),
            }
        }

    OUTPUT_NODE = True
    RETURN_TYPES = ("INT",)
    FUNCTION = "read_seed"
    CATEGORY = "utils"

    def read_seed(self, seed):
        ret = self.last_seed
        self.last_seed = seed
        return (ret,)

