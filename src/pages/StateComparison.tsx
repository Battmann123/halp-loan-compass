import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import SEO from "@/components/SEO";
import { Link } from "react-router-dom";
import { ArrowLeft, Map, TrendingDown, TrendingUp, Minus } from "lucide-react";
import {
  calculateStampDuty,
  calculateLmi,
  type AusState,
  type PropertyCategory,
} from "@/lib/calculations";

const ALL_STATES: AusState[] = ["NSW", "VIC", "QLD", "SA", "WA", "TAS", "NT", "ACT"];

// FHOG by state (matches GovernmentGrantsCalculator)
const fhogFor = (
  state: AusState,
  fhb: boolean,
  category: PropertyCategory,
  value: number
): number => {
  if (!fhb) return 0;
  const isNew = category === "new";
  switch (state) {
    case "NSW": return isNew && value <= 750000 ? 10000 : 0;
    case "VIC": return isNew && value <= 750000 ? 10000 : 0;
    case "QLD": return isNew && value <= 750000 ? 30000 : 0;
    case "SA":  return isNew ? 15000 : 0;
    case "WA":  return isNew && value <= 1000000 ? 10000 : 0;
    case "TAS": return isNew && value <= 750000 ? 10000 : 0;
    case "NT":  return isNew ? 50000 : 10000;
    case "ACT": return 0; // delivered via stamp duty exemption
  }
};

// Home Guarantee Scheme caps (October 2025)
const HGS_CAP: Record<AusState, number> = {
  NSW: 1500000, VIC: 950000, QLD: 1000000, SA: 900000,
  WA: 850000, TAS: 700000, NT: 600000, ACT: 1000000,
};

const fmt = (n: number) =>
  n.toLocaleString("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 0 });

const StateComparison = () => {
  const [propertyValue, setPropertyValue] = useState<number>(750000);
  const [loanAmount, setLoanAmount] = useState<number>(675000);
  const [isFhb, setIsFhb] = useState(true);
  const [occupancy, setOccupancy] = useState<"owner-occupier" | "investor">("owner-occupier");
  const [category, setCategory] = useState<PropertyCategory>("new");
  const [selectedStates, setSelectedStates] = useState<AusState[]>(["NSW", "VIC", "QLD", "WA"]);

  const rows = useMemo(() => {
    return ALL_STATES.map((s) => {
      const sd = calculateStampDuty({
        value: propertyValue,
        state: s,
        isFirstHomeBuyer: isFhb,
        occupancy,
        category,
      });
      const sdNoFhb = calculateStampDuty({
        value: propertyValue,
        state: s,
        isFirstHomeBuyer: false,
        occupancy,
        category,
      }).duty;
      const lmi = calculateLmi({
        loanAmount,
        propertyValue,
        isFirstHomeBuyer: isFhb,
        occupancy,
        state: s,
      });
      const fhog = fhogFor(s, isFhb, category, propertyValue);
      const hgsEligible =
        isFhb && propertyValue <= HGS_CAP[s] && (loanAmount / propertyValue) >= 0.8;
      const stampSaving = Math.max(0, sdNoFhb - sd.duty);
      const upfront = sd.total + lmi.total - fhog;
      return {
        state: s,
        stampDuty: sd.duty,
        stampSaving,
        lmi: lmi.total,
        lmiRequired: lmi.required,
        fhog,
        hgsEligible,
        upfront,
      };
    });
  }, [propertyValue, loanAmount, isFhb, occupancy, category]);

  const visible = rows.filter((r) => selectedStates.includes(r.state));
  const cheapest = visible.length
    ? visible.reduce((a, b) => (a.upfront < b.upfront ? a : b))
    : null;
  const dearest = visible.length
    ? visible.reduce((a, b) => (a.upfront > b.upfront ? a : b))
    : null;

  const toggleState = (s: AusState) => {
    setSelectedStates((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Compare Stamp Duty, LMI & Grants by State | HALP"
        description="Toggle Australian states and territories to instantly compare stamp duty, LMI, FHOG and Home Guarantee Scheme eligibility side-by-side."
        canonical="/compare-states"
      />
      <Navigation />

      <main className="flex-1 bg-secondary/30 py-12">
        <div className="container mx-auto px-4">
          <Link
            to="/calculators"
            className="inline-flex items-center text-primary hover:underline mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Calculators
          </Link>

          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <Map className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold">State & Territory Comparison</h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Toggle any combination of states to see how stamp duty, LMI and government
              grants change for the same property scenario. All figures use HALP's central
              calculation library so they match every other calculator on the site.
            </p>
          </div>

          {/* Inputs */}
          <Card className="mb-8 shadow-md">
            <CardHeader>
              <CardTitle>Your scenario</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="value">Property value (AUD)</Label>
                <Input
                  id="value"
                  type="number"
                  value={propertyValue || ""}
                  onChange={(e) => setPropertyValue(Number(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label htmlFor="loan">Loan amount (AUD)</Label>
                <Input
                  id="loan"
                  type="number"
                  value={loanAmount || ""}
                  onChange={(e) => setLoanAmount(Number(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label className="block mb-2">Occupancy</Label>
                <ToggleGroup
                  type="single"
                  value={occupancy}
                  onValueChange={(v) => v && setOccupancy(v as typeof occupancy)}
                  className="justify-start"
                >
                  <ToggleGroupItem value="owner-occupier">Owner-occupier</ToggleGroupItem>
                  <ToggleGroupItem value="investor">Investor</ToggleGroupItem>
                </ToggleGroup>
              </div>
              <div>
                <Label className="block mb-2">Property type</Label>
                <ToggleGroup
                  type="single"
                  value={category}
                  onValueChange={(v) => v && setCategory(v as PropertyCategory)}
                  className="justify-start"
                >
                  <ToggleGroupItem value="new">New</ToggleGroupItem>
                  <ToggleGroupItem value="established">Established</ToggleGroupItem>
                  <ToggleGroupItem value="vacant">Vacant land</ToggleGroupItem>
                </ToggleGroup>
              </div>
              <div className="flex items-center gap-2 md:col-span-2">
                <Checkbox
                  id="fhb"
                  checked={isFhb}
                  onCheckedChange={(c) => setIsFhb(!!c)}
                />
                <Label htmlFor="fhb" className="cursor-pointer">
                  First home buyer
                </Label>
              </div>
            </CardContent>
          </Card>

          {/* State toggles */}
          <Card className="mb-8 shadow-md">
            <CardHeader>
              <CardTitle>Compare which states?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {ALL_STATES.map((s) => {
                  const active = selectedStates.includes(s);
                  return (
                    <button
                      key={s}
                      onClick={() => toggleState(s)}
                      className={`px-4 py-2 rounded-full font-medium border transition-colors ${
                        active
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-card text-foreground border-border hover:border-primary"
                      }`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Summary */}
          {visible.length > 0 && cheapest && dearest && cheapest.state !== dearest.state && (
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <Card className="border-l-4 border-l-primary">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <TrendingDown className="h-4 w-4" /> Lowest upfront cost
                  </div>
                  <div className="text-2xl font-bold mt-1">{cheapest.state}</div>
                  <div className="text-lg text-primary">{fmt(cheapest.upfront)}</div>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-destructive">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <TrendingUp className="h-4 w-4" /> Highest upfront cost
                  </div>
                  <div className="text-2xl font-bold mt-1">{dearest.state}</div>
                  <div className="text-lg text-destructive">{fmt(dearest.upfront)}</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {fmt(dearest.upfront - cheapest.upfront)} more than {cheapest.state}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Comparison table */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Side-by-side breakdown</CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              {visible.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  Select at least one state above to see a comparison.
                </p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>State</TableHead>
                      <TableHead className="text-right">Stamp duty</TableHead>
                      <TableHead className="text-right">FHB saving</TableHead>
                      <TableHead className="text-right">LMI (incl. duty)</TableHead>
                      <TableHead className="text-right">FHOG</TableHead>
                      <TableHead>5% deposit (HGS)</TableHead>
                      <TableHead className="text-right">Net upfront</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {visible.map((r) => (
                      <TableRow
                        key={r.state}
                        className={
                          cheapest && r.state === cheapest.state
                            ? "bg-primary/5"
                            : undefined
                        }
                      >
                        <TableCell className="font-bold">{r.state}</TableCell>
                        <TableCell className="text-right">{fmt(r.stampDuty)}</TableCell>
                        <TableCell className="text-right">
                          {r.stampSaving > 0 ? (
                            <span className="text-primary">−{fmt(r.stampSaving)}</span>
                          ) : (
                            <span className="text-muted-foreground inline-flex items-center">
                              <Minus className="h-3 w-3" />
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          {r.lmiRequired ? (
                            fmt(r.lmi)
                          ) : (
                            <Badge variant="secondary">Not required</Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          {r.fhog > 0 ? (
                            <span className="text-primary">{fmt(r.fhog)}</span>
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {r.hgsEligible ? (
                            <Badge className="bg-primary text-primary-foreground">
                              Eligible
                            </Badge>
                          ) : (
                            <Badge variant="outline">Not eligible</Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right font-bold">
                          {fmt(r.upfront)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
              <p className="text-xs text-muted-foreground mt-4">
                Net upfront = stamp duty (incl. fees & foreign surcharge) + LMI − FHOG.
                LVR is calculated from your loan ÷ property value
                ({((loanAmount / Math.max(propertyValue, 1)) * 100).toFixed(1)}%).
                HGS eligibility requires LVR ≥ 80% and property under the state cap.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <CTASection />
      <Footer />
    </div>
  );
};

export default StateComparison;
