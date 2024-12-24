from .remember_last_seed import RememberLastSeed
from .show_last_seed import ShowLastSeed
from .show_last_text import ShowLastText


NODE_CLASS_MAPPINGS = {
    "RememberLastSeed": RememberLastSeed,
    "ShowLastSeed": ShowLastSeed,
    "ShowLastText": ShowLastText,
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "ShowLastSeed": "Show Last Seed",
    "RememberLastSeed": "Remember Last Seed",
    "ShowLastText": "Show Last Text",
}

WEB_DIRECTORY = "./web"

__all__ = ["NODE_CLASS_MAPPINGS", "NODE_DISPLAY_NAME_MAPPINGS", "WEB_DIRECTORY"]


