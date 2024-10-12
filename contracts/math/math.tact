import "./float.fc";
import "@stdlib/deploy";

@name(toFloat)
extends native toFloat(self: Int): Int;

@name(safeAdd)
extends native safeAdd(self: Int, b: Int): Int;

@name(safeSub)
extends native safeSub(self: Int, b: Int): Int;

@name(safeMul)
extends native safeMul(self: Int, b: Int): Int;

@name(safeDiv)
extends native safeDiv(self: Int, b: Int): Int;

@name(add)
extends native add(self: Int, b: Int): Int;

@name(sub)
extends native sub(self: Int, b: Int): Int;

@name(mul)
extends native mul(self: Int, b: Int): Int;

@name(div)
extends native div(self: Int, b: Int): Int;

@name(sqrtFloat)
extends native sqrtFloat(self: Int): Int;

@name(sqrt)
extends native sqrt(self: Int): Int;

